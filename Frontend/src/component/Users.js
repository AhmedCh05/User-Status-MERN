import "react-toastify/dist/ReactToastify.css";
import { FcCheckmark } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";

function Users({obj}){
    return (
        <>
        <tr
                className="even:bg-gray-50 shadow-sm text-gray-400"
                key={obj.id}
              >
                <td className="py-4">
                  <div className="flex items-center gap-x-3 justify-center">
                    <div className="w-1/3 flex justify-end">
                      <img
                        className="w-10 rounded-full h-10"
                        src={obj.ProfilePicture}
                        alt="profile"
                      />
                    </div>
                    <div className="text-start w-1/2">
                      <p className="font-medium text-black">{obj.fname} {obj.lname}</p>
                      <p className="text-xs">{obj.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">{obj.Occupation}</td>
                <td className="py-4">{obj.lastActive}</td>
                <td className="py-4">
                <span
                    className={
                      "inline-block px-3 py-1 rounded-2xl " +
                      (obj.Status === "Active"
                        ? "text-[#9bca70] bg-[#eff5e9]"
                        : "text-[#d6a243] bg-[#faf4e8]")
                    }
                  >
                    {obj.Status === "Active" ? (
                      <FcCheckmark className="inline-block mr-1 mb-1" />
                    ) : (
                      <RxCross2 className="inline-block mr-1 mb-1 text-base" />
                    )}
                    {obj.Status}
                  </span>
                </td>
                <td className="py-4">
                  <button className="bg-[#00ab46] text-white text-base px-3 py-1 rounded-xl">
                    Message
                  </button>
                </td>
              </tr>
        </>
    )
}

export default Users;