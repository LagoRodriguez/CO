
import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {
    verificarCuentaCorreo,
    actualizarCuentaContrasena,
} from "../../../controllers/Sesion"

import "./Ingresar.css";
import Notificacion from "../../../components/Notificacion/Notificacion";

const Verificar = (props) => {
    const [confirmarCorreo, setConfirmarCorreo] =useState("esperando");
    const [correoCliente, setCorreoCliente] = useState("");
    const [formContrasena, setFormContrasena] = useState("");
    const [estadoNotificacion, setEstadoNotificacion] = useState(false);
    const [mensajeNotificacion, setMensajeEstadoNotificacion] = useState(null);

    const cambiarDatosFormVerificar = (e) => {
        const value = e.target.value;
        setFormContrasena(value);
    };
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();
    let codigoVerificacion = query.get("oobCode");
    let modoVerificacion = query.get("mode");

    useEffect(() => {
            if (codigoVerificacion !== null && modoVerificacion === "verifyEmail") {
                verificarCuentaCorreo(codigoVerificacion).then((res) => {
                if (res === "error") {
                    setConfirmarCorreo("error");
                } else if (res === "expirado") {
                    setConfirmarCorreo("expirado");
                } else {
                    setConfirmarCorreo("correcto");
                    setCorreoCliente(res);
                }
            });
        }
    }, [codigoVerificacion, modoVerificacion]);

    const verificarContrasenaCliente = (e) => {
        e.preventDefault();
        actualizarCuentaContrasena(codigoVerificacion, formContrasena).then(
            (res) => {
                if (res === "cambiado") {
                    setEstadoNotificacion(true);
                    setMensajeEstadoNotificacion("Contrasena cambiada.");
                    setTimeout(() => {
                        props.history.push("/ingresar");
                    }, 4000);
                } else if (res === "no"){
                    setEstadoNotificacion(true);
                    setMensajeEstadoNotificacion("No se pudo cambiar la contrasena.");
                } else {
                    setEstadoNotificacion(true);
                    setMensajeEstadoNotificacion("Hubo un error.");
                }
            }
        );
    };

    return (
        <>
            <div className="contenedor-ingresar">
                <br/>
                <br/>
                <br/>
                {modoVerificacion === "verifyEmail" && (
                <>
                    {confirmarCorreo === "esperando" && <h3> Procesando...</h3>}
                    {confirmarCorreo === "error" && <h3>Error en la confirmacion</h3>}
                    {confirmarCorreo === "expirado" && (
                        <h3>Codigo de verificacion expirado</h3>
                    )}
                    {confirmarCorreo === "correcto" && (
                        <>
                        <h3> Correo: {correoCliente} verificado con exito</h3>
                        <p> Ya puede iniciar sesion
                            <Link to="/ingresar"> Aqui </Link>
                        </p>
                    </>
                )}
            </>
        )}
        {modoVerificacion === "resetPassword" && (
            <>
                {estadoNotificacion && (
                    <Notificacion
                        mensajeNotificacion={mensajeNotificacion}
                        setEstadoNotificacion={setEstadoNotificacion}
                        setMensajeEstadoNoticiacion={setMensajeEstadoNotificacion}
                    />
                )}

                <div className="contenedor-ingresar">
                    <h3>Recuperar Contrasena</h3>
                    <p>Escribe tu nueva contrasena</p>
                    <form onSubmit={verificarContrasenaCliente}>
                        <input
                            type="password" required
                            name="contrasena"
                            placeholder="Contrasena"
                            value={formContrasena}
                            onChange={cambiarDatosFormVerificar}
                        />{" "}
                        <input type="submit" value="Enviar"/>
                        <Link to="/ingresar" className="cambiar-contrasena">
                            Ingresar
                        </Link>
                    </form>
                </div>
            </>
        )}
        <br/>
        <br/>
        <br/>
    </div>
</>
);
};

export default Verificar;
