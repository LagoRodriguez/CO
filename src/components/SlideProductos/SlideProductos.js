import {Link} from "react-router-dom";
import React, {useRef} from "react";
import {productoCrearIDB} from "../../controllers/IndexDB";

import "./SlideProductos.css";
import EnviarWhatsAppProducto from "../../utils/EnviarWhatsAppProducto";

const SlideProductos = ({productos}) => {
    const contenedorProductosRef = useRef();

    const siguienteSlide = (e) => {
        const slide = contenedorProductosRef.current;
        // slide.scrollLeft -= slide.offsetWidth;
        // if(slide.scrollLeft <= 0) {
        //     slide.scrollLeft = slide.scrollWidth;
        slide.scrollBy({
            left: slide.offsetWidth,
            behavior: "smooth",
        });
    };

    const atrasSlide = (e) => {
        const slide = contenedorProductosRef.current;
        // slide.scrollLeft += slide.offsetWidth;
        // if(slide.scrollLeft >= slide.scrollWidth - slide.offsetWidth) {
        //     slide.scrollLeft = 0;
        slide.scrollBy({
            left: -slide.offsetWidth,
            behavior: "smooth",
        });
    };

    const agregarCarrito = (producto) => {
        let productoIDB = {
            IdProducto: producto.IdProducto,
            Nombre: producto.Nombre,
            Marca: producto.Marca,
            Descripcion: producto.Descripcion,
            Precio: producto.Precio,
            Cantidad: producto.Cantidad,
            TiempoEntrega: producto.tiempoEntrega,
            ImagenUrl: producto.ImagenUrl[0],
            Unidad: 1
        };
        productoCrearIDB(productoIDB);
    };

    return(
        <>
            <div className="contenedor-titulo">
                <h2 className="titulo" >Novedades</h2>
            </div>
            <div className="slider-productos-herramienta">
                <div className="slide-productos-imagen" ref={contenedorProductosRef}>
                    {productos.map((producto) => (
                        <div className="card-producto-slide" key={producto.IdProducto}>
                            <Link to={`/producto/${producto.UrlProducto}/${producto.IdProducto}`}>
                                <div>
                                    {producto.ImagenUrl && producto.ImagenUrl.length > 0 && (
                                    <img
                                        className="slide-productos-imagen-item"
                                        src={producto.ImagenUrl[0]}
                                        alt=""
                                    />
                                        )}
                                </div>
                            </Link>

                                <div className="slide-productos-botones">
                                    <img src="/icons/Carrito.svg"
                                         onClick={() => agregarCarrito(producto)}
                                         alt="carrito"
                                    />
                                    <img src="/icons/Corazon.svg"
                                         alt="corazon" />
                                    <img onClick={() =>
                                            EnviarWhatsAppProducto(producto)}
                                            src="/icons/Whatsapp.svg"
                                            alt="whatsapp"/>
                                </div>
                                <div>
                                    <h3>{producto.Nombre}</h3>
                                    <p>{producto.Precio}€</p>
                                </div>
                        </div>
                        ))}
                    </div>
                    {/*<div>*/}
                    {/*    <div className="control-atras-slide" onClick={() => siguienteSlide()}>*/}
                <div>
                    <div className="control-atras-slide" onClick={atrasSlide}>
                        {/* Icono para retroceder */}
                            <img src="icons/Retroceder.svg" alt="" />
                        </div>
                    {/*<div className="control-siguiente-slide" onClick={() => atrasSlide()}>*/}
                    <div className="control-siguiente-slide" onClick={siguienteSlide}>
                        {/* Icono para avanzar */}
                        <img src="icons/Siguiente.svg" alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SlideProductos;



