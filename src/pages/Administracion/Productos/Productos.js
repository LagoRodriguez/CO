import {useEffect, useState} from "react";
import {db} from "../../../firebase/firebase"
import {collection, onSnapshot} from "firebase/firestore";
import {productoEliminar} from "../../../controllers/Productos";
import ProductosCrearModal from "./ProductosModal/ProductosCrearModal";
import ProductosEditarModal from "./ProductosModal/ProductosEditarModal";
import {LayoutAdministracion} from "../../../layout/conLayout";

import "./ProductosModal/Productos.css";

const Productos = () => {
    const [estadoModal, setEstadoModal] = useState(false);
    const [estadoModalEditar, setEstadoModalEditar] = useState(false);
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState({});

    useEffect(() => {
        onSnapshot(collection(db, "Productos"), (snapshot) => {
            setProductos(
                snapshot.docs.map((doc) => ({
                    IdProducto: doc.id,
                    ...doc.data(),
                }))
            );
        });
    }, []);

    const habilitarEditar = (productoItem) => {
        setProductoSeleccionado(productoItem);
        setEstadoModalEditar(!estadoModalEditar);
    };

    return (
        <>
            {estadoModal && <ProductosCrearModal setEstadoModal={setEstadoModal}/>}
            {estadoModalEditar && (
                <ProductosEditarModal
                    setEstadoModalEditar={setEstadoModalEditar}
                    productoSeleccionado={productoSeleccionado}
                />
            )}
            <h4 style={{ marginTop: '80px'}}>
                Productos</h4>
            {productos?.length === 0 ? (
                <h5>No hay productos</h5>
            ) : (
                <>
                    {productos.map((productoItem) => (
                        <div
                            key={productoItem.IdProducto}
                            className="contenedor-direccion"
                        >
                         <img
                            className="imagen-tabla"
                            src={productoItem.ImagenUrl[0]}
                            alt=""
                            />
                            <p>{productoItem.Nombre}</p>
                            <p>{productoItem.UrlProducto}</p>
                            <p>{productoItem.Descripcion}</p>
                            <p>{productoItem.Categoria}</p>
                            <p>{productoItem.Marca}</p>
                            <p>EUR{productoItem.Precio}</p>
                            <p>{productoItem.Cantidad}</p>
                            <p>{productoItem.TiempoEntrega}</p>
                            <button onClick={() => habilitarEditar(productoItem)}>
                                Editar
                            </button>
                            <button
                                onClick={() => productoEliminar(productoItem.IdProducto)}
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </>
            )}
            <button
                onClick={() => setEstadoModal(!estadoModal)}
                className="contenedor-direccion-boton"
            >
                Anadir producto
            </button>
            <LayoutAdministracion/>

        </>
    );
};

export default Productos;
