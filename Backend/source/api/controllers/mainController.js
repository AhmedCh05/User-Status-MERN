require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const User = require("../models/user.model");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyparser = require('body-parser');
const { createTokens } = require("../utils/JsonWebTokens");
const { validateToken } = require("../middlewares/auth");
const { getUserID } = require("../utils/getUserId");
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");


const app = express();

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", methods: "GET,PUT,POST,DELETE" }));


mongoose.connect(process.env.MONGO_SERVER);
const Database = mongoose.connection;
Database.on("error", console.error.bind(console, "connection error: "));
Database.once("open", () => {
	console.log("Connected To Database successfully");
});


////				SIGN UP USER

app.post("/Signup", async (req, res) => {
	const { password } = req.body;
	const d = new Date();
	const formattedDate = d.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric"
	})
	bcrypt.hash(password, 10).then(async (hash) => {
		const user = new User({
			fname: req.body.fname,
			lname: req.body.lname,
			email: req.body.email,
			password: hash,
			DOB: req.body.DOB,
			Gender: req.body.Gender,
			Occupation: req.body.Occupation,
			Bio: req.body.Bio,
			Status: "Active",
			lastActive: formattedDate
		});
		const H = await user.save();
		res.status(200).send("User Account Registered");
	});


});

////				LOGIN USER

app.post("/User/login", async (req, res) => {
	const { email, password } = req.body;

	const register = await User.findOne({ email: email });
	if (!register) {
		return res.sendStatus(400);
	}
	const dbPassword = register.password;
	bcrypt.compare(password, dbPassword).then((match) => {
		if (!match) {
			return res.sendStatus(400);
		}
		else {
			const accessToken = createTokens(register);
			User.updateOne(
				{ _id: register._id },
				{ $set: { Status: "Active" } },
				(updateErr) => {
					if (updateErr) {
						console.error(updateErr);
						return;
					}
				}
			);
			res.send(accessToken)
		}
	});
});

/////              DISPLAY ACTIVE USER PROFILE IMG

app.get("/ActiveUser", getUserID, async (req, res) => {
	User.findOne({ _id: (req.user.id) }, (findErr, result) => {
		if (findErr) {
			console.error(findErr);
			res.status(500).send(findErr);
			return;
		}
		if (result == null) {
			res.status(404).send("User Profile Not Found");

		}
		else {
			res.send(result.ProfilePicture);
		}
	});
});

// ////              DISPLAY All USERS

// app.get("/allUsers", async (req, res)=>{
//     User.find((err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send(err);
//             return;
//         }
//         res.send(result);
//     });
// });

////              DISPLAY All USERS PAGINATION

app.get('/allusers', (req, res) => {
	var pageNo = parseInt(req.query.pageNo)
	var size = parseInt(req.query.size);
	var query = {}
	if (pageNo < 0 || pageNo === 0) {
		response = { "error": true, "message": "invalid page number, should start with 1" };
		return res.send(response)
	}
	query.skip = size * (pageNo - 1)
	query.limit = size
	// Find some documents
	User.count({}, function (err, totalCount) {
		if (err) {
			response = { "error": true, "message": "Error fetching data" }
		}
		User.find({}, {}, query, function (err, data) {
			// Mongo command to fetch all data from collection.
			if (err) {
				response = { "error": true, "message": "Error fetching data" };
			} else {
				var totalPages = Math.ceil(totalCount / size)
				response = { "error": false, "message": data, "pages": totalPages };
			}
			res.send(response);
		});
	})
})


////              Verify Email

app.post("/verifyEmail", async (req, res) => {
	const { email } = req.body;
	const user = User.find({ email: email });
	if (user) {
		res.sendStatus(200);
	}
});

////              Forget Password

app.put("/forgetPassword", async (req, res) => {
	const { email } = req.body;
	const { password } = req.body;
	bcrypt.hash(password, 10).then(async (hash) => {
		const user = await User.find({ email: email });
		if (user) {
			User.updateOne(
				{ _id: user[0]._id },
				{ $set: { password: hash } },
				(updateErr) => {
					if (updateErr) {
						console.error(updateErr);
						res.status(500).send(updateErr);
						return;
					}

					res.send({ message: "User Password successfully updated" });
				}
			);
		}
	}
	);
});

////              	Change Password

app.put("/changePassword", getUserID, async (req, res) => {
	const { password } = req.body;
	bcrypt.hash(password, 10).then(async (hash) => {
		const user = await User.find({ _id: (req.user.id) });
		if (user) {
			User.updateOne(
				{ _id: user[0]._id },
				{ $set: { password: hash } },
				(updateErr) => {
					if (updateErr) {
						console.error(updateErr);
						res.status(500).send(updateErr);
						return;
					}

					res.send({ message: "User Password successfully updated" });
				}
			);
		}
	}
	);
});

////            DISPLAY BY ID

app.get('/CurrentUser', getUserID, async (req, res) => {
	User.findOne({ _id: (req.user.id) }, (findErr, result) => {
		if (findErr) {
			console.error(findErr);
			res.status(500).send(findErr);
			return;
		}
		if (result == null) {
			res.status(404).send("User Not Found");

		}
		else {
			res.send(result);
		}
	});
});

////            UPDATE USER BY ID

app.put("/updateuser", getUserID, (req, res) => {
	const updatedUser = req.body;
	User.updateOne(
		{ _id: req.user.id },
		{ $set: updatedUser },
		(updateErr) => {
			if (updateErr) {
				console.error(updateErr);
				res.status(500).send(updateErr);
				return;
			}

			res.send({ message: "User Details successfully updated" });
		}
	);
});


////              LOG OUT USER

app.get("/User/Logout", getUserID, async (req, res) => {
	const d = new Date();
	const formattedDate = d.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric"
	})

	User.updateOne(
		{ _id: req.user.id },
		{ $set: { lastActive: formattedDate, Status: "Disabled" } },
		(updateErr) => {
			if (updateErr) {
				console.error(updateErr);
				res.status(500).send(updateErr);
				return;
			}
			res.send({ message: "User Logged Out" })
		}
	)
});


////					S3 Routes For Image (Save)

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage
})
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
	credentials: {
		accessKeyId: accessKey,
		secretAccessKey: secretAccessKey
	},
	region: bucketRegion
})


app.post('/userIcon',getUserID, upload.single('image'), async (req, res) => {
	const userid = req.user.id;
	req.file.buffer;
	const params = {
		Bucket: bucketName,
		Key: `${userid}.png`,
		Body: req.file.buffer,
		ContentType: req.file.mimetype,
	}

	const command = new PutObjectCommand(params)
	await s3.send(command);

	const getObjectParams = {
		Bucket: bucketName,
		Key: `${userid}.png`
	}
	const cmd = new GetObjectCommand(getObjectParams);
	const url = await getSignedUrl(s3, cmd, { expiresIn: 388800 });

	User.updateOne(
		{ _id: userid },
		{ $set: { ProfilePicture: url } },
		(updateErr) => {
			if (updateErr) {
				console.error(updateErr);
				res.status(500).send(updateErr);
				return;
			}
			res.send({ message: "User Image Added" })
		}
	)

})


////					SEARCH BAR

app.use('/search', (req, res, next) => {
	const filters = req.query;
	const filteredUsers = data.filter(user => {
		let isValid = true;
		for (key in filters) {
			console.log(key, user[key], filters[key]);
			isValid = isValid && user[key] == filters[key];
		}
		return isValid;
	});
	res.send(filteredUsers);
});


app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});


