## 1. Before you begin

- Read all documentation and inform lead developer of any unclear instructions before started working on the project
- Time duration for project completion is **1 week**
- Daily communication with lead developer is required to update progress
- Add progress to Slack channel **( practices )**  every day with these defined points:
    - What was done today?
    - What will be done tomorrow?
    - Any hurdles encountered during the day?
- Although the lead developer is available for assistance, it is recommended that you try to resolve issues independently prior to seeking support to optimize time utilization for all.
- Use resources like Google, official documentation of framework, library to help find solutions.
- to speed up development  on the frontend and your own learning , it’s recommended to use:
    - Tailwind css alternative to regular css
    - framework like Mantine, Bootstrap or Material UI which you think’s best.
- Google Luck with your project 🙂

---

## 2. Figma Design

[https://www.figma.com/file/LiRYkD8F6rq428x2kK6r6X/PROJECT-1.0?node-id=0%3A1](https://www.figma.com/file/LiRYkD8F6rq428x2kK6r6X/PROJECT-1.0?node-id=0%3A1)

---

## **3. Introduction**

This is a MERN stack web application that includes a JWT-based authentication system and a user database. Users can sign up, sign in, and update their profiles, which include various user information. The app has four pages, and only authenticated users can access the user list page. User profile pictures are stored in S3, and the project includes a search bar for users to find other users. The UI is user-friendly, with form validation and alerts for successes and failures. The app maintains the user's authentication state after page reloads.

---

## 4. **Pages**

- root
- sign-in
- signup
- path: `/`
- user list page
- Only authenticated users can see this page.
- The page will show a list of active users.
- On the top-right user's profile picture should be visible
- on clicking it a dropdown with the below options should appear
- Edit Profile
- Sign Out
- path: `/users`

---

## 5. **Acceptance Criteria**

- The MERN project should be created with a JWT-based authentication system and should use a database of your choice.
- The project should contain user information, including first name, last name, email, password, date of birth, gender, occupation, bio, and profile picture.
- A user should be considered active if they have logged in within the last hour.
- The project should include the following pages: root, sign-in, signup, and user list.
- Only authenticated users should be able to access the user list page.
- The user list page should display a list of active users and show the current user’s profile picture in the top-right corner.
- Clicking on the profile picture should display a dropdown menu with the options to edit profile and sign out.
- The UI should be reasonable and the forms should have form validation.
- The user should be able to sign-up, sign-in, sign-out, and update their own profiles.
- Upon signing up or logging in, the user should be redirected to the user list page where they can view all active users.
- If an unauthenticated user attempts to access the user list page, they should be redirected to the root page to sign-up or login.
- Logging out should redirect the user to the login page.
- User profile pictures should be stored in S3 using pre-signed URLs.
- A toast/alert/notification should be displayed for both successes and failures.
- The user’s authentication state should not be affected by page reloads.
- The project should include a search bar for users to search for other users based on criteria such as name or occupation.

---

## 5. **Bonus Criteria**

- designing as close as [figma design](https://www.figma.com/file/LiRYkD8F6rq428x2kK6r6X/PROJECT-1.0?node-id=0%3A1)
- The project should implement **role-based access control**, allowing different levels of access for different types of users (e.g., admin vs regular user).
    - Admin - can search and delete normal users
- The project should allow users to **sign in with their social media accounts**.
- The project should include a **real-time chat feature**.
