import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const generateToken = (id) => {
    return jwt.sign({ id
    }, process.env.JWT_SECRET, { expiresIn: "1h"});
};

export const registerUser  = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Todos os campos são necessários" });
    }

    try {
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ success: false, message: "O e-mail já está em uso" });
        }

        const user = await User.create({
            name, email, password,
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Todos os campos são necessários" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ success: false, message: "Credenciais inválidas" });
        }
        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id }).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "Usuário não encontrado" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
}