import {useState, useContext} from "react";
import {EstadoContexto} from "../../context/EstadoGeneral";
import EnviarWhatsAppProducto from "../../utils/EnviarWhatsAppProducto";
import CargangoPagina from './CargangoPagina';
import{eliminarCarritoIDB} from "../../controllers/IndexDB";

import "./FormularioPagar.css";

const FormularioPagar = ({productosTotal, totalAPagar, productos}) => {
    const [cargando, setCargando] = useState(false);

    const {usuario} = useContext(EstadoContexto);
    const existeUsuario = Object.keys(usuario).length;

    const pagarPaypal = async () => {
        if (existeUsuario) {
            setCargando(true);
            setTimeout(() => {
                eliminarCarritoIDB()
                setCargando(false);
                console.log("Estas comprando");
            }, 1000);
        } else {
            console.log("Por favor, registrate para poder comprar");
        }
    };
    return (
        <>
            {cargando && <CargangoPagina/>}

            <div className="formulario-pagar">
                <div className="formulario-pagar-titulo">
                    <h3> Resumen del pedido</h3>
                </div>
                <div className="contenedor-resultado">
                    <p>Cantidad de productos:</p>
                    <span> {productosTotal}</span>
                </div>
                <div className="contenedor-resultado">
                    <p>Total a pagar:</p>
                    <span>EUR{totalAPagar()}</span>
                </div>
                <div className="contenedor-resultado">
                    <p>Envio:</p>
                    <span>A tratar</span>
                </div>
                <div className="constenedor-descripcion-imagen">
                    <img
                        onClick={() => pagarPaypal()}
                        src="/images/pagos/Imagen-Boton-Paypal.png"
                        alt=""
                    />
                    <img
                        style={{marginTop: "8px"}}
                        onClick={() => EnviarWhatsAppCarrito(productos, totalAPagar())}
                        src="/images/pagos/Imagen-Boton-WhatsApp.png"
                        alt=""
                    />
                </div>
            </div>
        </>
    );
};

export default FormularioPagar;