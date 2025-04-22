import {DataTypes} from 'sequelize';
import sequelize from '../config/db.js'
import bcrypt from 'bcryptjs';

const Admin = sequelize.define('',{
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
})


Admin.beforeCreate(async(admin)=>{
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
})

Admin.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

export default Admin;