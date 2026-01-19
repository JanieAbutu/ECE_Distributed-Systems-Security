const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 4002;
const mongoose = require("mongoose");
const User = require("./modelUser");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/auth-service")
    .then(() => console.log("Auth-Service DB Connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// The register method will create and add a new user to the database
app.post("/auth/register", async (req, res) => {
    let { name, email, password } = req.body;
    // Check whether the new user is already registered with the same email address or not
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.json({ message: "This user already exists" }); // 
    } else {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ error: err });
            } else {
                password = hash;

                const newUser = new User({
                    name,
                    email,
                    password
                });
                newUser.save()
                    .then(user => res.status(201).json({ message: 'User created successfully' }))
                    .catch(error => res.status(400).json({ error }));
            }
        });
    }
});

// The login method will return a token after verifying the email and password
app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ message: "User not found" });
    } else {
        bcrypt.compare(password, user.password).then(result => {
            if (!result) {
                return res.json({ message: "Incorrect password" });
            } else {
                const payload = {
                    email,
                    name: user.name
                };
                // Login route
                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
                    if (err) console.log(err);
                    else return res.json({ token });
                });   
            }
        });
    }
});

app.listen(PORT, () => {
    console.log(`Auth-Service at ${PORT}`);
});
