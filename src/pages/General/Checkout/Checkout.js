import {Link} from "react-router-dom";
import {useContext} from "react";
import {useLiveQuery} from "dexie-react-hooks/src";
import {
    productoEliminarIDB,
    productoEditarIDB,
    db2
} from "../../../controllers/IndexDB";
import ProductoCheckout from "../../../components/ProductoCheckout/ProductoCheckout";
import FormularioPagar from "../../../../components/FormularioPagar/FormularioPagar";
import {EstadoContexto} from "../../../context/EstadoGeneral";

import "./Checkout.css";

const Checkout = () => {
    const {usuario} = useContext(EstadoContexto);
    const existeUsuario = Object.keys(usuario).length;

    const productos = useLiveQuery(() => db2.productosIDB.toArray());
    const productosTotal = useLiveQuery(() => db2.productosIDB.count());

    //const totalAPagar = () =>
    //  productos?.reduce(
    //      (antes, actual) => parseFloat(actual.Precio) * actual.Unidad + antes,
    //      0
    //  );

    const totalAPagar = () =>
        productos?.reduce(
            (antes, actual) => antes + parseFloat(actual.Precio) * actual.Unidad,
            0
        );

    return (
        <>
            {!productos || productosTotal === undefined ? (
                <h5>No hay productos</h5>
            ) : (
                <>
                    <div className="contenedor-titulo">
                        <h2 className="titulo"> CARRITO DE COMPRAS</h2>
                    </div>
                    <div className="contenedor-grid-carrito">
                        <div className="grid-carrito-productos">
                            <ProductoCheckout productos={productos} />
                            <br/>
                            {existeUsuario ? (
                                <>
                                <h2 className="titulo">Direccion de envio</h2>
                                </>
                            ) : (
                                <>
                                    <p> Tiene que registrarse </p>
                                </>
                            )}
                        </div>
                        <div className="grid-carrito-pagar">
                            <FormularioPagar
                                productosTotal={productosTotal}
                                totalAPagar={totalAPagar}
                                productos={productos}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    )};

export default Checkout;