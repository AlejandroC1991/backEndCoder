import ManagerUsuarios from "./manager/ManagerUsuarios.js";

const manager = new ManagerUsuarios();

const managerUsuarios = async() => {
    let usuarios = await manager.consultarUsuarios();
    console.log(usuarios);


    const user = {
        nombre : "Damian",
        apellido : "Celiberto",
        edad : 31,
        curso : "BackEnd"
    };
    await manager.crearUsuario(user);
    usuarios = await manager.consultarUsuarios();
    console.log(usuarios);
}

managerUsuarios();