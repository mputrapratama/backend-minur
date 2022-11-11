import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Customers = db.define('customers',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    contactNumber: {
        type: DataTypes.INTEGER
    },
    os: {
        type: DataTypes.STRING
    },
    desc: {
        type: DataTypes.TEXT
    }
},{
    freezeTableName: true
});

export default Customers;