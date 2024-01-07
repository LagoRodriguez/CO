import {useEffect, useState} from "react";
import {db} from "../../../firebase/firebase"
import {collection, onSnapshot} from "firebase/firestore";
import CategoriasCrearModal from "./CategoriasModal/CategoriasCrearModal";
import CategoriasEditarModal from "./CategoriasModal/CategoriasEditarModal";
import {categoriaEliminar} from "../../../controllers/Categorias";
import {LayoutAdministracion} from "../../../layout/conLayout";

import "./Categorias.css";


const Categorias = () => {
    const [estadoModal, setEstadoModal] = useState(false);
    const [estadoModalEditar, setEstadoModalEditar] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({});

    useEffect(() => {
        onSnapshot(collection(db, "Categorias"), (snapshot) => {
            setCategorias(
                snapshot.docs.map((doc) => ({
                    IdCategoria: doc.id,
                    ...doc.data(),
                }))
            );
        });
    }, []);

    const habilitarEditar = (categoriaItem) => {
        setCategoriaSeleccionada(categoriaItem);
        setEstadoModalEditar(!estadoModalEditar);
    };

    return (
        <>
            {estadoModal && <CategoriasCrearModal setEstadoModal={setEstadoModal}/>}
            {estadoModalEditar && (
                <CategoriasEditarModal
                    setEstadoModalEditar={setEstadoModalEditar}
                    categoriaSeleccionada={categoriaSeleccionada}
                />
            )}
            <h4 style={{ marginTop: '80px'}}>
                Categorias</h4>
            {categorias?.length === 0 ? (
                <h5>No hay categorías</h5>
            ) : (
                <>
                    {categorias.map((categoriaItem) => (
                        <div
                            key={categoriaItem.IdCategoria}
                            className="contenedor-direccion"
                        >
                            <p>{categoriaItem.Nombre}</p>
                            <p>{categoriaItem.Descripcion}</p>
                            <p>{categoriaItem.UrlCategoria}</p>
                            <button onClick={() => habilitarEditar(categoriaItem)}>
                                Editar
                            </button>
                            <button
                                onClick={() => categoriaEliminar(categoriaItem.IdCategoria)}
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
                Anadir
            </button>

            <LayoutAdministracion/>

        </>
    );
};

export default Categorias;
