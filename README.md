# Blogify
🎨 Step 1: Setting Up the Views

**Your views** folder contains everything related to how your pages look.
Inside it, we’ve made a subfolder called partials/ — here’s why 👇

📁 views/partials/

head.ejs → Contains the <head> section (like linking Bootstrap, meta tags, title, etc.).

scripts.ejs → Contains your <script> tags (Bootstrap JS, custom scripts).

nav.ejs → Your reusable navbar component (copied/modified from Bootstrap).

🧠 Reason:
These files are common across all pages. Instead of repeating them everywhere, we include them once using the EJS include function — keeping our code clean and modular.

🏠 home.ejs

Your main homepage file.
To use the partials here, you’ll include them like this:

<%- include('./partials/head') %>   <!-- Inside the <head> -->
...
<body>
  <%- include('./partials/nav') %>  <!-- Navbar inside body -->
  ...
  <%- include('./partials/scripts') %> <!-- Scripts before closing body -->
</body>


✨ This way, every page automatically gets the same consistent layout.

👤 models/user.js — Structuring User Data

The model defines how your user’s data will look and behave in MongoDB.

🧩 Example Schema
role: {
  type: String,
}


You can add fields like name, email, password, role, etc.
Each user document in MongoDB follows this blueprint.

🛡️ Password Hashing Middleware

We use a Mongoose pre-save hook to hash passwords before saving users to the database — ensuring their data stays safe.

Let’s break it down 👇

1️⃣ userSchema.pre('save', function(next) {...})

This is a Mongoose middleware.

It runs right before a user is saved in the database.

It allows you to modify the user data (e.g., hash passwords).

2️⃣ const user = this;

Refers to the current user document that’s about to be saved.
Example:

const newUser = new User({ name: "Shiwangi", password: "1234" });
await newUser.save(); // 'this' refers to newUser

3️⃣ if (!user.isModified("password")) return;

Checks whether the password has been changed.

Prevents re-hashing if only other fields (like name/email) are updated.

4️⃣ const salt = randomBytes(16).toString('hex');

Creates a unique random salt for each user.

Even if two users have the same password, their hashes will differ.

5️⃣ Hashing the password:
const hashedPassword = createHmac('sha256', salt)
  .update(user.password)
  .digest("hex");


Uses SHA-256 algorithm.

“Scrambles” the password into an irreversible string.

6️⃣ Save salt and hash:
this.salt = salt;
this.password = hashedPassword;

7️⃣ next();

Tells Mongoose the hashing process is complete — proceed to save.

💡 In short:

Before saving a user, this middleware securely hashes their password (using a random salt) so no plain-text passwords are ever stored.

🚦 routes/user.js — Defining Routes

This file controls where your app takes the user when they visit certain URLs.

🧭 Basic Routes
Route	Method	Description
/signup	.get()	Displays the signup page (signup.ejs)
/signup	.post()	Handles form submission — saves the new user
/signin	.get()	Displays the signin page (signin.ejs)
/signin	.post()	Verifies user credentials

🗺️ Think of it as your map — when users visit a certain path, the route decides what page or logic runs next.