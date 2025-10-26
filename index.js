const path = require("path");
const express = require('express');
const mongoose = require("mongoose");
const userRoute = require('./routes/user');
const app = express();
const PORT = 8000;
mongoose.connect('mongodb://localhost:27017/blogify').then(e => console.log("MongoDB Connected"));
/* so here we are trying to create a website for everyone and this port might not be avaialble , so to tackle this problem .env comes into play */
app.set("view engine",'ejs')
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.get('/', (req,res) => {
    res.render("home");
});
app.use("/user", userRoute);
app.listen(PORT, () => console.log('Server Started at PORT:${PORT}'));

/* devdependencies are those kind of dependency which are only helpful during the development process and we don't need them in the production process like nodemon. we need nodemon for the server automatic server restart but in production no need*/ 