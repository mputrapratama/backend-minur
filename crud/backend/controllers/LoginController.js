import Login from "../models/LoginModel.js";

export const getLogin = async(req, res) =>{
    try {
        const response = await Login.findAll();
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}