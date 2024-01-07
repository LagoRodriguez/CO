import React from 'react';
import {Link} from 'react-router-dom'

import "./CarritoCompras.css"

const CarritoCompras = ({setBotonCarrito, botonCarrito}) => {
    return(
        <>
        <div className={
            botonCarrito
            ? "contenedor-carrito contenedor-carrito-activo"
            : "contenedor-carrito"
        }
    >
            <div className="carrito-cabecera">
                <span> Tienes 2 artículos en tu carrito</span>
                <img
                    src={"icons/Cerrar.svg"}
                    alt=""
                    className="cerrar-carrito"
                    onClick={() =>setBotonCarrito(!botonCarrito)}
                    />
            </div>
            <div className="carrito-contenido">
                <div>
                    <div className="carrito-productos">
                      <div className="carrito-producto-item">
                          <div className="carrito-item-imagen">
                              <img src="/images/CortePelo.jpg" alt=""/>
                          </div>
                      </div>
                        <div className="carrito-producto-descripcion">
                            <div className="carrito-contenedor-info">
                                <div className="carrito-descripcion-info">
                                    <span> Bono </span>
                                    <span> Corte </span>
                                    <span> Hombre </span>
                                </div>
                                <span> 50EUR </span>
                            </div>
                            <div className="carrito-contenedor-controles">
                                <select name="" id="">
                                    <option> Tipo Bono</option>
                                    <option value="1">3 cortes</option>
                                    <option value="2">6 cortes</option>
                                    <option value="3">10 cortes</option>
                                </select> {""}
                                <p>Eliminar</p>
                            </div>
                        </div>
                    </div>
                    {/*BORRAR*/}
                    <div className="carrito-productos">
                        <div className="carrito-producto-item">
                            <div className="carrito-item-imagen">
                                <img src="/images/CremasYodeyma.png" alt=""/>
                            </div>
                        </div>
                        <div className="carrito-producto-descripcion">
                            <div className="carrito-contenedor-info">
                                <div className="carrito-descripcion-info">
                                    <span> Cremas </span>
                                    <span> Yodeyma </span>
                                    <span> Antiedad </span>
                                </div>
                                <span> 50EUR </span>
                            </div>
                            <div className="carrito-contenedor-controles">
                                <select name="" id="">
                                    <option> Tipo Bono</option>
                                    <option value="1"> Pack Antiedad</option>
                                    <option value="2">Pack Reparador</option>
                                </select> {""}
                                <p>Eliminar</p>
                            </div>
                        </div>
                    </div>
                    {/*BORRAR*/}
                </div>
                <div className="carrito-detalles">
                    <div className="carrito-detalles-contenido">
                        <p>Total pedido</p>
                        <p>100EUR</p>
                    </div>
                        <div className="carrito-detalle-botones">
                            <Link to="/Tienda" className="carrito-detalles-botones-comprar">
                                Finalizar pedido
                            </Link>
                            <Link to="/Tienda" className="carrito-detalles-botones-seguir">
                                Continuar comprando
                            </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default CarritoCompras;