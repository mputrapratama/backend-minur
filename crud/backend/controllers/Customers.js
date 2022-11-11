import Customers from "../models/CustomerModel.js";

//Get Customers
export const getCustomers = async(req, res) => {
    try {
        const customers = await Customers.findAll({
            attributes:['uuid', 'name', 'email', 'contactNumber', 'os', 'desc']
        });
        res.json(customers);
    } catch (error) {
        console.log(error);
    }
}

//Get Customer By ID
export const getCustomerById = async(req, res) => {
    try {
        const Customer = await Customers.findOne({
            attributes:['uuid', 'name', 'email', 'contactNumber', 'os', 'desc'],
            where: {
                uuid: req.params.id
            }
        });
        res.json(Customer);
    } catch (error) {
        console.log(error);
    }
}

//Create
export const CreateData = async(req,res) => {
    const { name, email, contactNumber, os, desc } = req.body;
    try {
        await Customers.create({
            name: name,
            email: email,
            contactNumber: contactNumber,
            os: os,
            desc: desc
        });
        res.json({msg: "Succesfully"});
    } catch (error) {
        console.log(error);
    } 
}

//Delete Customers
export const deleteData = async(req, res) => {
    const customer = await Customers.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!customer) return res.status(404).json({msg: "Data is not found"});
    try {
        await Customers.destroy({
            where: {
                id: customer.id
            }
        });
        res.status(200).json({msg: "Data deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}