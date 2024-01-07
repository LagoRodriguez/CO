import React from 'react';
import {Link} from 'react-router-dom';

import "./Guardados.css";

const Guardados = () => {
    return(
        <>
        <h4> Elementos guardados</h4>
    <div className="contenedor-guardados-productos">
        <div className="guardados-imagen">
            <Link to="tienda">
                <img src="/images/img1.jpg" alt="  "/>
            </Link>{" "}
        </div>
        <div className="guardados-descripcion">
            <div>
            <Link to="tienda">
                <h5> Descripcion </h5>
            </Link> {" "}
            <span style={{color: 'yellow'}}> 22,95</span>
            <br/>
            <span> Ultimas unidades </span>
            <div className="guardados-descripcion-botones">
                <select name="" id="">
                    <option> Seleccionar Bono</option>
                    <option> value="Masaje"> Masaje</option>
                    <option value="Presoterapia">Presoterapia</option>
                </select>
                <button>Añadir a la cesta</button>
            </div>
        </div>
        <div className="guardados-descripcion-borrar">
            <span>p</span>
        </div>
    </div>
</div>
</>
);
};

export default Guardados;