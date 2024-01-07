import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import "./Pie.css"
import {EstadoContexto} from "../../context/EstadoGeneral";
import CalcularPantalla from "../../utils/CalcularPantalla";

export default function Pie (){

    const {usuario} = useContext(EstadoContexto);
    const existeUsuario = Object.keys(usuario).length;

    return (
        <>
            <div className="contenedor-pie">
                <div className="pie-registro">
                    <h3> Registrate </h3>
                <form>
                    <input type="email" required name="correo" placeholder="correo"/>
                    <input type="submit" value="Enviar"/>
                </form>
                    <Link to="/avisoLegal"> Aviso legal</Link>
                    <Link to="/privacidad">Política de privacidad y cookies</Link>
                </div>

                <div className="pie-redes-sociales">
                <h3>Redes sociales</h3>
                <a href="https://www.instagram.com/chocolat_peluqueria_estetica/" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.facebook.com/chocolat5agosto/" target="_blank" rel="noopener noreferrer">Facebook</a>

            </div>
            <div className="pie-info">
                <h3>Info</h3>
                <Link to={existeUsuario ? "/cliente/perfil" : "/ingresar"}>
                    Cuenta
                </Link>                <a href="https://wa.me/+34691626728" target="_blank" rel="noopener noreferrer">Whatsapp</a>
                <Link to="/contacto">
                    Contacto </Link>
            </div> {" "}

            </div>
        </>
    );
}