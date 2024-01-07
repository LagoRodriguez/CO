import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Notificacion from "../../../components/Notificacion/Notificacion";
import {ingresarClienteAuth, traerUnCliente} from "../../../controllers/Sesion";

import "./Ingresar.css";
import {EstadoContexto} from "../../../context/EstadoGeneral";
import {LayoutGeneral} from "../../../layout/conLayout";
import Pie from "../../../components/Pie/Pie";

const initFormIngresar = {
    correo: "",
    contrasena: "",
};

const Ingresar = (props) => {
    const {iniciarSesion} = useContext(EstadoContexto);
    const [formIngresar, setFormIngresar] = useState(initFormIngresar);
    const [usuarioVerificado, setUsuarioVerificado] = useState(null)
    const cambiarDatosFormIngresar = (e) => {
        const{name, value} = e.target;
        setFormIngresar({
            ...formIngresar,
            [name]: value,
        });
    };

    const[estadoNotificacion, setEstadoNotificacion] = useState(false);
    const[mensajeNotificacion, setMensajeNotificacion] = useState(null);

    useEffect(() => {
        if(usuarioVerificado) {
            (async () => {
                const usuarioData = await traerUnCliente(usuarioVerificado);
                iniciarSesion(usuarioData);
                setTimeout(
                    () => {
                    props.history.push("/cliente/perfil");
                }, 40000);
            })();
        }
        setUsuarioVerificado(null);
    }, [usuarioVerificado, iniciarSesion, props.history]);

    const ingresarCliente =(e) => {
        e.preventDefault();
        ingresarClienteAuth(formIngresar).then ((res) => {
                if (res.idUsuario){
                    console.log(res);
                    setUsuarioVerificado(res);
                } else if (res ==="noVerificado"){
                    setEstadoNotificacion(true);
                    setMensajeNotificacion("Primero tienes que verificar tu correo.");
                } else if (res==="ontrasenaIncorrecta"){
                    setEstadoNotificacion(true);
                    setMensajeNotificacion("Contrasena incorrecta");
                } else {
                    setEstadoNotificacion(true);
                    setMensajeNotificacion("Hay un error")
                }
                setFormIngresar(initFormIngresar);
            });
        };

    return (
        <>
            <LayoutGeneral/>
            {estadoNotificacion && (
                <Notificacion
                    mensajeNotificacion = {mensajeNotificacion}
                    setEstadoNotificacion = {setEstadoNotificacion}
                    setMensajeEstadoNotificacion = {setMensajeNotificacion}
                />
            )}
            <div className="contenedor-ingresar">
                <h3> Accede a tu cuenta </h3>
                <p>
                    Aun no tienes una cuenta ?
                    <Link to="/registrar"> Pulsa aqui </Link>
                </p>
                <form onSubmit={ingresarCliente}>
                    <input
                        type="email"
                        required
                        name="correo"
                        placeholder="Correo"
                        value={formIngresar.correo}
                        onChange={cambiarDatosFormIngresar}
                    /> {" "}
                    <input
                        type="password"
                        required
                        name="contrasena"
                        placeholder="Contrasena"
                        value={formIngresar.contrasena}
                        onChange={cambiarDatosFormIngresar}
                    />
                        <input type="submit" value="Acceder"/>
                        <Link to="/recuperar" className="cambiar-contrasena">
                            No recuerdas tu contrasena?
                        </Link>
                    </form>
             </div>
            </>
        );
};

export default Ingresar;