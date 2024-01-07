import React from 'react';
import {Link} from "react-router-dom";

import "./Categorias.css"

const Categorias = ({productos}) => {
    const hola = [
        {
            id:1,
            texto: "Productos",
            img:"/images/YodeymaHombre.avif",
        },
        {
            id:2,
            texto: "Servicios",
            img:"/images/CortePelo.jpg",
        },
    ];
    return (
        <div className="grid-categorias">
            <div className="grid-categorias-centrar">
                {hola.map((categorias) => (
                    <div Key={categorias} className="contenedor-categorias-item">
                        <img src={categorias.img} alt="" />
                        <div>
                            <Link to="/Tienda">{categorias.texto}</Link>
                        </div> {" "}
                      </div>
                    ))}
                </div>
            </div>
    );
};

export default Categorias;