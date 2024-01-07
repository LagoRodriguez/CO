import {useState, useContext} from "react";
import {EstadoContexto} from "../../context/EstadoGeneral";
import{
    productoAumentarUnidadIDB,
    productoDisminuirUnidadIDB,
    productoEliminarIDB
} from "../../controllers/IndexDB";

import "./ProductoCheckout.css";
import {productoEliminar} from "../../controllers/Productos";

const ProductoLinea = ({producto}) => {
    const {usuario} =useContext(EstadoContexto);
    const existeUsuario = Object.keys(usuario).length;

    const [formUnidad, setFormUnidad] = useState(producto.Unidad);

    const aumentar = () => {
        setFormUnidad(formUnidad + 1);
        productoAumentarUnidadIDB(producto.IdProducto, formUnidad);
    };

    const disminuir = () => {
        if (formUnidad > 1) {
            setFormUnidad(formUnidad - 1);
            productoDisminuirUnidadIDB(producto.IdProducto, formUnidad);
        }
    };

    const guardarProducto = (producto) => {
        if (existeUsuario) {
        console.log(producto.IdProducto);
        } else {
        console.log("Por favor, para poder guardar tu producto, registrate");
    }
};

return (

    <tr>
        <td>
            <img className="imagen-tabla" src={producto.ImagenUrl} alt=""/>
            <p>{producto.Nombre}</p>
        </td>
        <td>EUR{producto.Precio}</td>
        <td>
            {formUnidad}
            <button
                style={{width: "25px", height: "25px", background: "black"}}
                onClick={() => aumentar()}
            >
                +
            </button>
            <button
                style={{width: "25px", height: "25px", background: "black"}}
                onClick={() => disminuir()}
            >
                -
            </button>
        </td>
        <td>
            <h3>EUR {formUnidad * parseFloat(producto.Precio)}</h3>
        </td>
        <td>
            <button
                style={{background: "black"}}
                onClick={() => productoEliminarIDB(producto.IdProducto)}
            >
                Eliminar
            </button>
            <br/>
            <br/>
            <button
                style={{background: "black"}}
                onClick={() => guardarProducto(producto)}
            >
                Guardar
            </button>
        </td>
    </tr>
);
};

export default ProductoLinea;
