import {useContext} from "react";
import {EstadoContexto} from "../../context/EstadoGeneral";
import {Link} from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import Pie from "../../components/Pie/Pie";
import Promocion from "../../components/Promocion/Promocion";

import "./LayoutCliente.css"


const LayoutAdministracion = (props) => {
    const {cerrarSesion} = useContext(EstadoContexto);
    const {children} = props;

return (
    <>
        <Menu />
            <div className="contenedor-perfil">
                <div className="cabecera-perfil">
                    <h4>Bienvenido a la sección de administración de Chocolat</h4>
                </div>
                <div className="grid-perfil">
                    <div className="grid-perfil-menu">
                        <ul>
                            <li>
                                <Link to="/administracion/reportes">Reportes</Link>
                            </li>
                            <li>
                                <Link to="/administracion/categorias">Categorias</Link>
                            </li>
                            <li>
                                <Link to="/administracion/etiquetas">Etiquetas</Link>
                            </li>
                            <li>
                                <Link to="/administracion/productos">Productos</Link>
                                {/*<Link to="/producto/:producto/:id">Productos</Link>*/}
                            </li>
                            <li>
                                <Link to="/cliente/guardados">Clientes</Link>
                            </li>
                            <li>
                                <Link to="/tienda">Pedidos</Link>
                            </li>
                        </ul>
                        <Link
                            className="boton-cerrar-sesion"
                            to="#"
                            onClick={cerrarSesion}
                        >
                            Cerrar Sesion
                        </Link>
                    </div>

                    <div className="grid-perfil-detalles">{children}</div>
                </div>
            </div>
    </>
);
};
export default LayoutAdministracion;
