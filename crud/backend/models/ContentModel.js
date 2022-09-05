import {Sequelize} from 'sequelize';
import db from '../config/database.js';

const {DataTypes} = Sequelize;

const Content = db.define('content',{
    title: DataTypes.STRING,
    content: DataTypes.STRING
},{
    freezeTableName:true
});

export default Content;

(async()=>{
    await db.sync();
})();