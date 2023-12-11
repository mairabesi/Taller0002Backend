import  express from "express";
import { routerMascotas } from "../rutas/mascotasRouter.js";
import { db } from "../database/conexion.js";

//crear instancia de express
const app = express();

//middleawere
app.use(express.json())


//verificar conexion a base de datos
db.authenticate().then(()=>{
    console.log(`Base de Datos conectada de manera exitosa`);
}).catch(err=>{
    console.log(`Error al conectarse a la Base de Datos ::: ${err}`);
})


//Definir rutas
app.get("/",(req,res)=>{
    res.send("Hola Backend Mysql");
});

//Rutas
app.use("/mascotas",routerMascotas)

//puerto del servidor
const PORT =8000;

//verifica que pueda sicronizar con la base de datos
db.sync().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Servidor Inicializado en puerto ${PORT}`);
    } );
}).catch(err=>{
    console.log(`Error al sincronizar Base de Datos ${err}`);
});
