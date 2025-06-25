// backend/models/user.model.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "O nome é obrigatório."],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "O e-mail é obrigatório."],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "A senha é obrigatória."],
        minlength: [8, "A senha deve ter no mínimo 8 caracteres."],
    },
    settings: {
        pomodoro: {
            longTime: { type: Number, default: 25 },
            shortTime: { type: Number, default: 5 },
            longBreak: { type: Number, default: 15 }
        }
    }
}, {
    timestamps: true
});

// Middleware (hook) do Mongoose para criptografar a senha ANTES de salvar
userSchema.pre('save', async function (next) {
    // Executa a função apenas se a senha foi modificada (ou é nova)
    if (!this.isModified('password')) {
        return next();
    }

    // Gera o "salt" e criptografa a senha
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar a senha fornecida com a senha criptografada no banco
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model("User", userSchema);

export default User;