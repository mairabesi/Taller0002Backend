//importa sequelize
import Sequelize from "sequelize";

//importar un usuario para la base de datos (base, usuari, contra)
const db = new Sequelize("mascotas","mascotas","mascotas2023",{
    dialect: "mysql",
    host: "localhost"
});

export {db}