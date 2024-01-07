import {useContext} from "react";
import {EstadoContexto} from "../../context/EstadoGeneral";
import {Link} from 'react-router-dom';
import Menu from "../../components/Menu/Menu";
import Promocion from "../../components/Promocion/Promocion";
import Pie from "../../components/Pie/Pie";
const LayoutCliente = (props) => {
    const {cerrarSesion} = useContext(EstadoContexto);
    const {children} = props;

    return (
        <>
            <Menu/>
            <section className="contenedor-seccion">
                <Promocion/>

                <div className="contenedor-perfil">
                    <div className="cabecera-perfil">
                        <h3>Bienvenido</h3>
                        <p>Ya formas parte de ChocolatOnline</p>
                    </div>
                    <div className="grid-perfil">
                        <div className="grid-perfil-menu">
                            <ul>
                                <li>
                                    <Link to="/Tienda">Mis datos</Link>
                                </li>
                                <li>
                                    <Link to="/Tienda">Elementos guardados</Link>
                                </li>
                                <li>
                                    <Link to="/Tienda">Mis compras</Link>
                                </li>
                                <li>
                                    <Link to="/Tienda">Dirección de envío</Link>
                                </li>
                            </ul>
                            <Link className="boton-cerrar-sesion"
                                  to="#"
                                  onClick={cerrarSesion}
                            >
                                Cerrar Sesion
                            </Link>
                        </div>

                        <div className="grid-perfil-detalles">{children}</div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default LayoutCliente;