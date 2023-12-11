//importar el modelo
import {mascotas} from "../modelos/mascotasModelo.js";

//crear un recurso en esa tabla

const crear = (req,res)=>{
    if(!req.body.nombre){
        res.status(400).json({

            mensaje: "el nombre no puede estar vacio."
        });
        return;
    }
    const dataset={
        nombre: req.body.nombre,
        edad: req.body.edad
    };

    //usar squeli<e para crear un recurso
    mascotas.create(dataset).then((resultado)=>{
        res.status(200).json({
            mensaje:"Registro creado correctamente"
        })
    }).catch((err)=>{
        res.status(500).json({
           mensaje: `Error al crear el registro ::: ${err}`
        })       
    })
};

//buscar recurso po ID
const buscarId =(req,res)=>{
    const id = req.params.id;
    if(id==null){
        res.status(203).json({
            mensaje:  `El id no puede estar vacio`
        });
        return
    }

    mascotas.findByPk(id).then((resultado)=>{
        res.status(200).json(resultado);
    }).catch((err)=>{
        res.status(500).json({
            mensaje:  `Registro no encontrado ::: ${err}`
        });
    });
}

const buscar = (req,res)=>{
    mascotas.findAll().then((resultado)=>{
        res.status(200).json(resultado);
    }).catch((err)=>{
        res.status(500).json({
            mensaje:  `no se ecuentranRegistro no encontrado ::: ${err}`
        });
    });
};
const actualizar =(req,res)=>{
    const id= req.params.id;
    if(!req.body.nombre && !req.body.edad){
        res.status(500).json({
            mensaje:  `no se ecuentraron Datos para actualizar`
        });
        return;
    }
    else{
        nombre= req.body.nombre;
        edad=req.body.edad;
        mascotas.uptade({nombre,edad},{where:{id}})
        .then((resultado)=>{
            res.status(200).json({
                mensaje: `Registro Actualizado`
            });
        })
        .catch((err)=>{
            res.status(500).json({
                mensaje:  `error a actualizar registro ::: ${err}`
            });
        })    
    }
};
const eliminar=(req,res)=>{
    const id= req.params.id;
    if(id == null){
        res.status(203).json({
            mensaje: `El id no puede estar vacio`
        });
        return;
    }
    mascotas.destroy({where:{id}})
    .then((resultado)=>{
        res.status(200).json({
            mensaje: `Registro Eliminado`
        });
    })
    .catch((err)=>{
        res.status(500).json({
            mensaje: `Error al eliminar Registro ::: ${err}`
        });
    })
    

};

export {crear, buscarId, buscar,actualizar,eliminar}