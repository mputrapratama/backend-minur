import Content from "../models/ContentModel.js";

export const getContent = async(req, res) => {
    try {
        const response = await Content.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}