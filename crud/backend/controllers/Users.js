import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { kirimEmail } from "../helpers/index.js";
import Customers from "../models/CustomerModel.js";
import Auth from "../models/AuthModel.js";
import dotenv from "dotenv";

dotenv.config();

// Get Users
export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['uuid','name','email', 'role']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

// Get Users By Id
export const getUserById = async(req, res) =>{
    try {
        const user = await Users.findOne({
            attributes:['uuid','name','email','role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// Register Users
export const Register = async(req, res) => {
    const { name, email, username, password, confPassword, role } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            username: username,
            password: hashPassword,
            role: role
        });
        res.json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// Login Users
export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"});
    }
}

// Logout Users
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

// Delete Users
export const deleteUser = async(req, res) =>{
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await Users.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

// Update Users
export const updateUser = async(req, res) =>{
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

// Create Template Email for Notification
export const NotifEmail = async (req, res) => {
    const { email, name, contactNumber, os, desc } = req.body
        const user = await Customers.findOne({
        attributes:['name', 'email', 'contactNumber', 'os', 'desc'],
            where: {
                email : email
            }
        });
        res.status(200).json(user);

    const templateEmail = {
        from: 'Developer',
        to: '200204622034@student.unm.ac.id',
        subject: 'New Project Claim',
        html: `
        <h1>User has filled out the customer form</h1>
        <p>Name : ${name}</p>
        <p>Email : ${email}</p>
        <p>Contact : ${contactNumber}</p>
        <p>Platform : ${os}</p>
        <p>Description : ${desc}</p>
        <br></br>
        <p>For more information, visit ${process.env.BASE_URL}</p>`
    }
    kirimEmail(templateEmail)   
}

//Auth Register Users
export const AuthRegister = async (req, res) => {
    const { email, name } = req.body
        const user = await Auth.findOne({
        attributes:['name', 'email'],
            where: {
                email : email
            }
        });
        res.status(200).json(user);

    const templateEmail = {
        from: 'Developer',
        to: email,
        subject: `One touch more ${name}, lets connect with our service`,
        html: `
        <h1>Notification Register User</h1>
        <p>Thanks for using our service, please click link below to continue your registe process</p>
        <p>Link: ${process.env.BASE_URL}/${email}/verify/${process.env.ACCESS_TOKEN_SECRET}"</p>
        <br></br>
        <p>For more information, visit ${process.env.BASE_URL}</p>`
    }
    kirimEmail(templateEmail)   
}


