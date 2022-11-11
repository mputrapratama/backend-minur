import Auth from "../models/AuthModel.js";
import bcrypt from "bcrypt";
import { kirimEmail } from "../helpers/index.js";
import dotenv from "dotenv";

dotenv.config();

// Register users
export const AuthRegister = async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password,salt);
    try {
        await Auth.create({
            name: name,
            email: email, 
            password: hashPassword
        });
        res.json({msg: "register berhasil"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// Create Template Email for Register
export const RegisterNotif = async (req, res) => {
    const { email, username } = req.body
    const user = await Auth.findOne({
        where: {
            email: email
        }
    });
    res.status(200).json(user.email);
    const templateEmail = {
        from: 'Developer',
        to: email,
        subject: 'Notification for Registration Users',
        html: `
        <p>Link : ${process.env.BASE_URL}/${username}/notif/${process.env.ACCESS_TOKEN_SECRET}</p>`
    }
    kirimEmail(templateEmail)   
}