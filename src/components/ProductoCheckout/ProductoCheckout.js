import "./ProductoCheckout.css";
import ProductoLinea from "./ProductoLinea";

const ProductoCheckout = ({productos}) => {
    return (
        <table className="tabla-producto-checkout">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((producto) => (
                    <ProductoLinea key={producto.IdProducto} producto={producto} />
                ))}
                </tbody>
            </table>
    );
};

export default ProductoCheckout;