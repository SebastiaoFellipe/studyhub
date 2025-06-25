import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ success: false, message: "Não autorizado, sem token"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded ID:", decoded.id); // Adicione este log
        req.user = await User.findById({ _id: decoded.id }).select("-password");
        next();
    } catch (error) {
        console.error("Error:", error); // Adicione este log para ver o erro
        return res.status(401).json({ success: false, message: "Não autorizado, token falhou"});
    }
};
