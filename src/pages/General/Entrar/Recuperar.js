import {useState} from "react";
import {Link} from "react-router-dom"
import {recuperarContrasena} from "../../../controllers/Sesion";
import Notificacion from "../../../components/Notificacion/Notificacion";

import "./Ingresar.css";

const Recuperar =() => {
    const [formCorreo, setFormCorreo] = useState("");
    const cambiarDatosFormRecuperar = (e) => {
        const value = e.target.value;
        setFormCorreo(value);
    };
    const [estadoNotificacion, setEstadoNotificacion] = useState(false);
    const [mensajeNotificacion, setMensajeNotificacion] = useState(null);

    const recuperarCliente = (e) => {
        e.preventDefault();
        recuperarContrasena(formCorreo).then((res) => {
            if (res === "correcto") {
                setEstadoNotificacion (true);
                setMensajeNotificacion(
                    "Ya se envio un mensaje a tu correo para recuperar tu contrasena."
                );
            } else {
                setEstadoNotificacion (true);
                setMensajeNotificacion("Error no se pudo");
            }
        });
        setFormCorreo("");
    };

    return (
        <>
            {estadoNotificacion && (
                <Notificacion
                    mensajeNotificacion={mensajeNotificacion}
                    setEstadoNotificacion={setEstadoNotificacion}
                    setMensajeEstadoNoticiacion={setMensajeNotificacion}
                />
            )}
            <div className="contenedor-ingresar">
                 <h3> Recuperar Contrasena</h3>
                <p> Te enviaremos un email para recuperar tu contrasena</p>
                <form onSubmit={recuperarCliente}>
                    <input
                        type="email" required name="correo"
                        placeholder="Correo"
                        value = {formCorreo}
                        onChange = {cambiarDatosFormRecuperar}
                    />{" "}

                    <input type="submit" value="Enviar"/>
                    <Link to="/Tienda" className="cambiar-contrasena">
                        Cancelar
                    </Link>
                </form>
            </div>
        </>
    );
};

export default Recuperar;