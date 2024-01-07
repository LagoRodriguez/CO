import React, {useState} from "react";
import "./Ingresar.css";
import Modal from "../../../components/Modal/Modal";
import {Link} from "react-router-dom";
import {registrarClienteAuth} from "../../../controllers/Sesion";
import Notificacion from "../../../components/Notificacion/Notificacion";
import {LayoutGeneral} from "../../../layout/conLayout";
import Pie from "../../../components/Pie/Pie";

const initFormRegistrar = {
    correo: "",
    contrasena: "",
};

const Registrar = (props) => {
    const [formRegistrar, setFormRegistrar] = useState(initFormRegistrar);
    const cambiarDatosFormRegistrar = (e) => {
        const{name, value} = e.target;
        setFormRegistrar({
            ...formRegistrar,
            [name]: value,
        });
    };

    const[formCheck,setFormCheck] = useState(false);
    const cambiarEstadoCheck = (event) => {
        setFormCheck(event.target.checked);
    };
    const [estadoModal, setEstadoModal] = useState( false );
    const [estadoNotificacion, setEstadoNotificacion] = useState( false );
    const [mensajeNotificacion, setMensajeNotificacion] = useState( null);
    const [verificandoEnvio, setVerificandoEnvio] = useState(false);


    const crearCliente =(e) => {
        e.preventDefault();
        if (formCheck === false){
            setEstadoModal(true);
        } else {
        registrarClienteAuth(formRegistrar).then((res) => {
            if (res ==="Correcto"){
               setEstadoNotificacion(true);
               setMensajeNotificacion( "Registrado correctamente, verifique su correo para validar");
               setTimeout (() => {
                    props.history.push("/ingresar");
                }, 4000);
            } else if (res ==="Repetido"){
                setEstadoNotificacion(true);
                setMensajeNotificacion("El correo introducido ya fue registrado.");
                setTimeout (() => {
                    props.history.push("/ingresar");
                }, 4000);
            } else if (res==="Contrasena"){
                setEstadoNotificacion(true);
                setMensajeNotificacion("La contrasena debe ser mayor de 6 digitos");
            }
            setFormRegistrar(initFormRegistrar);
            setFormCheck(false)
        });
        }
    };

    const mensajeModal ="Acepte terminos para continuar";

    return (
        <>
            <LayoutGeneral/>
            {estadoModal && (
                <Modal mensajeModal = {mensajeModal} setEstadoModal = {estadoModal}/>
            )}
            {estadoNotificacion && (
                <Notificacion
                    mensajeNotificacion = {mensajeNotificacion}
                    setEstadoNotificacion = {setEstadoNotificacion}
                    setMensajeEstadoNotifiacion = {setMensajeNotificacion}
                />
            )}
            <div className="contenedor-ingresar">
                <h3> Crear cuenta </h3>
                <p>
                Ya tienes una cuenta ?
                <Link to="/tienda"> Pulsa aqui </Link>
                </p>
                {verificandoEnvio &&(
                    <Modal
                        mensajeModal={mensajeModal}
                        setVerificandoEnvio={setVerificandoEnvio}
                    />
                )}

                <form onSubmit={crearCliente}>
                    <input
                        type="email"
                        required
                        name="correo"
                        placeholder="Correo"
                        value={formRegistrar.correo}
                        onChange={cambiarDatosFormRegistrar}
                    />
                    <input
                        type="password"
                        required
                        name="contrasena"
                        placeholder="Contrasena"
                        value={formRegistrar.contrasena}
                        onChange={cambiarDatosFormRegistrar}
                    />
                    <label className='contenedor-pie-check'>
                        <span>
                        Me gustaria recibir notificaciones sobre
                        productos y descuentos.
                        </span>
                        <input type="checkbox" onChange={cambiarEstadoCheck}/>
                        <span className="checkmark-pie">
                            {formCheck ? (
                                <img src="/icons/IconoCheck.svg" alt="logo"/>
                            ):(
                                <> </>
                            )}
                        </span>
                    </label> {" "}
                    <input type="submit" value="Submit"/>
                    <span className="contenedor-cambiar-contrasena">
                        Al proporcionar tu correo electronico, aceptas nuestra
                        <Link to="/tienda" className="cambiar-contrasena">
                            Politica de privacidad, terminos y condiciones
                        </Link>
                    </span>
                </form>
            </div>
            <Pie/>
        </>
    );
};

export default Registrar;