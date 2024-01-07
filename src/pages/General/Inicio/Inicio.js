import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {todosProductos} from "../../../controllers/Productos"
import Promociones from '../../../components/Promociones/Promociones';
import apiCategoria from "../../../components/Menu/apiCategoria";
import Categorias from "../../../components/Categorias/Categorias";
import SlideProductos from "../../../components/SlideProductos/SlideProductos";
import Slider from "../../../components/Slider/Slider";
import Menu from "../../../components/Menu/Menu";
import {LayoutGeneral} from "../../../layout/conLayout";
import Pie from "../../../components/Pie/Pie";
import "./Inicio.css";

const Inicio =  () => {
    const [dataCategoria] =useState(apiCategoria);
    const [productos, setProductos] = useState([]);

        useEffect(() => {
            (async () => {
                const productosDB = await todosProductos();
                setProductos(productosDB);
            })();
        }, []);

    return (
        <>
            <LayoutGeneral/>
            <Menu/>
            <Slider/>
            <Promociones/>
            <SlideProductos productos = {productos} />
            <Categorias productos = {dataCategoria} />
            <section className="contenedor-seccion">
            <div className="manifiesto">
                <div className="manifiesto-contenido">
                    <h4>Más de 10 Años de Belleza y Confianza</h4>
                    <p> La belleza va más allá del corte y el estilo. Durante más de una década, hemos cultivado un espacio donde los lazos se forman, las historias se comparten y la confianza se gana.</p>
                    <Link to="/manifiesto"> Conócenos </Link>
                </div>
                <div className="manifiesto-imagen">
                    <img src="/images/zonaManicura.png" alt=""/>
                </div>
                <div className="manifiesto-imagen-central">
                    <img src="/images/10años.png" alt="" />
                </div>
                <div className="manifiesto-imagen">
                    <img src="/images/zonaPedicura.png" alt="" />
                </div>
            </div>
            </section>
            <Categorias productos = {dataCategoria} />
            <Pie/>
        </>
    );
};


export default Inicio;