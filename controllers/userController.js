
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signUp = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ msg: "Please enter all fields" });

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ msg: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ msg: "Please enter all fields" });

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id }, 'secret_key');

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}); 
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
}

module.exports = { signUp, login,getAllUsers };
