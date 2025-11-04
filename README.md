# Blogify

🚀 Node.js Blog Project Setup Guide
📁 Project Structure (Files so far)
controllers/
models/
routes/
views/
index.js

🪄 Step 1: Setting Up the Views

Inside the views folder:

📂 Create a subfolder named partials, and inside it add:

head.ejs

scripts.ejs

💡 Reason:
These files contain code common to every page — helps keep your views clean and modular.

In home.ejs, include them using:

<%- include('./partials/head') %>
<%- include('./partials/scripts') %>

🧭 Navbar Setup

To create a navbar:

Copy Bootstrap’s navbar code.

Save it as partials/nav.ejs.

🧩 Model: models/user.js

Defines how user data is structured and stored in MongoDB.

Example:

role: {
  type: String,
}

🔒 Password Hashing Before Saving

We use Mongoose middleware:

userSchema.pre('save', function (next) { ... })


This runs before saving a user document.

Why Hash Passwords?

Storing plain text passwords is unsafe.
Instead, we:

Take the password.

“Scramble” it (hashing).

Store the scrambled version + a random “salt”.

🧠 Step-by-Step Explanation

1️⃣ userSchema.pre('save', function (next) { ... })
Runs before saving — allows modifying data (like hashing passwords).

2️⃣ const user = this;
Refers to the user document being saved.

3️⃣ if (!user.isModified("password")) return;
Hashes only when password changes.

4️⃣ const salt = randomBytes(16).toString('hex');
Generates a unique salt per user.

5️⃣

const hashedPassword = createHmac('sha256', salt)
  .update(user.password)
  .digest('hex');


Creates the hashed (scrambled) version of the password.

6️⃣ this.salt = salt;
Stores the salt in the database.

7️⃣ this.password = hashedPassword;
Replaces the real password with the hashed one.

8️⃣ next();
Continues to save the user.

🧩 Conceptually:

This code runs before saving a user.
It hashes the password (with a random salt) for security.
It only runs if the password has been modified.

🌐 Routes: routes/user.js

Defines the routes for:

/signin

/signup

Each route:

Has .get and .post methods.

Renders signin.ejs or signup.ejs with Bootstrap layout.

🧠 Back to models/user.js

Add a static method:

userSchema.static('matchPassword', function (...) { ... });

💭 What It Does

Checks if the entered password (after hashing) matches the stored hash + salt.

Think of it as:

“matchPassword” = Lock & Key Mechanism 🔐
If the new hash matches the stored hash, login succeeds.

👉 Tip:
Copy signup.ejs → rename to signin.ejs → remove the “first name” input.

🔑 Authentication with JWT

We use jsonwebtoken for authentication, so create:

middlewares/authentication.js

🎟️ What JWT Does

A JSON Web Token (JWT) acts like a digital ID card.
After login, the server gives a token to the client.

🔁 Flow

Function to create a token.

Function to validate it later.

Secret Key:
Used to sign and verify tokens.

jwt.sign(payload, secretKey);


payload → user data

secretKey → ensures the token’s authenticity

⚠️ Handling Errors

In routes/user.js (POST route):

Use a try–catch block to handle wrong credentials.

If login fails:

Re-render signin.ejs

Display an error message
(No controller changes required)

🧰 Middleware: middlewares/authentication.js

This middleware ensures only logged-in users can access certain routes (like creating/editing blogs).

🧾 How It Works

Checks if the request has a valid JWT token (from cookies or headers).

If valid → allows access.

If invalid → redirects to sign-in page.

🏁 index.js Setup

Install and require cookie-parser:

npm i cookie-parser


Then:

const cookieParser = require('cookie-parser');
app.use(cookieParser());


💡 Purpose:
Lets Express read cookies from client requests.

🧩 Dynamic Navbar

After JWT verification, modify your navbar logic in EJS:

<% if (locals.user) { %>
  <!-- Show username -->
<% } else { %>
  <!-- Show Signin button -->
<% } %>

✍️ Model: models/blog.js

Create a schema to store blog data (title, content, image, etc.).

🧾 View: partials/addBlog.ejs

Use Bootstrap to build a form with:

Cover Image → <input type="file">

Title → <input type="text">

Blog Content → <textarea>

📸 Handling File Uploads (Multer)

Install multer:

npm i multer


Then:

Visit the Multer documentation
.

Copy the storage configuration code.

Paste it into index.js.

Modify the storage block as needed.