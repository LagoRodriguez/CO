import React, {useState, useEffect, useContext} from "react";
import {EstadoContexto} from "../../../context/EstadoGeneral";
import {editarPerfilSoloDatos} from "../../../controllers/Perfil";

import "./Perfil.css";
import {LayoutCliente} from "../../../layout/conLayout";

const initFormCliente = {
    idCliente: "",
    nombres: "",
    apellidos: "",
    telefono: "",
};
const Perfil = () => {
    const {usuario} = useContext(EstadoContexto);
    const [formCliente, setFormCliente] = useState(initFormCliente);

    useEffect(() => {
        if (Object.keys(usuario).length) {
            setFormCliente({
                idCliente: usuario.IdCliente,
                nombres: usuario.Nombres === "undefined" || !usuario.Nombres ? "" : usuario.Nombres,
                apellidos: usuario.Apellidos === "undefined" || !usuario.Apellidos ? "" : usuario.Apellidos,
                telefono: usuario.Telefono === "undefined" || !usuario.Telefono ? "" : usuario.Telefono,
            });
        }
    }, [usuario]);

    const cambiarDatos = (e) => {
        const {name, value} = e.target;
        setFormCliente({
            ...formCliente,
            [name]: value,
        });
    };

    const editarDatosPerfil = (e) => {
        e.preventDefault();
        console.log("Actualizando");
        editarPerfilSoloDatos(formCliente);
    };

    return (
        <>
            <LayoutCliente/>
            <h4> Detalles </h4>
            <form onSubmit={editarDatosPerfil}>
                <p>Nombre:</p>
                <input
                    type="text" required
                    name="nombre"
                    placeholder="Nombres"
                    value={formCliente.nombres}
                    onChange={cambiarDatos}
                />
                <p>Apellidos:</p>
                <input
                    type="text" required
                    name="apellidos"
                    placeholder="Apellidos"
                    value={formCliente.apellidos}
                    onChange={cambiarDatos}
                />
                <p>Telefono:</p>
                <input
                    type="text" required
                    name="telefono"
                    placeholder="Telefono"
                    value={formCliente.telefono}
                    onChange={cambiarDatos}
                />
                <p>Correo:</p>
                <input
                    type="text" disabled required
                    name="correo"
                    placeholder="Correo"
                    defaultValue={usuario.Correo}
                />
                <input type="submit" value="Enviar"/>
            </form>
        </>
    );
};

export default Perfil;