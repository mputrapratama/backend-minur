import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Login = db.define('login',{
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
},{
    freezeTableName:true
});

export default Login;

(async()=>{
    await db.sync();
})();