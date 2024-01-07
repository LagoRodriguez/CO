import {useEffect, useState} from "react";
import {db} from "../../../firebase/firebase"
import {collection, onSnapshot} from "firebase/firestore";
import {etiquetaEliminar} from "../../../controllers/Etiquetas";
import EtiquetasCrearModal from "./EtiquetasModal/EtiquetasCrearModal";
import EtiquetasEditarModal from "./EtiquetasModal/EtiquetasEditarModal";

import "./Etiquetas.css";

const Etiquetas = () => {
    const [estadoModal, setEstadoModal] = useState(false);
    const [estadoModalEditar, setEstadoModalEditar] = useState(false);
    const [etiquetas, setEtiquetas] = useState([]);
    const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState({});

    useEffect(() => {
        onSnapshot(collection(db, "Etiquetas"), (Snapshot) => {
            setEtiquetas(
                Snapshot.docs.map((doc) => ({
                    IdEtiqueta: doc.id,
                    ...doc.data()
                }))
            );
        });
    }, []);

    const habilitarEditar = (etiquetaItem) => {
        setEtiquetaSeleccionada(etiquetaItem);
        setEstadoModalEditar(!estadoModalEditar);
    };

    return (
        <>
            {estadoModal && <EtiquetasCrearModal setEstadoModal={setEstadoModal}/>}
            {estadoModalEditar && (
                <EtiquetasEditarModal
                    setEstadoModalEditar={setEstadoModalEditar}
                    etiquetaSeleccionada={etiquetaSeleccionada}
                />
            )}
            <h4>Etiquetas</h4>
            {etiquetas?.length === 0 ? (
                <h5>No hay etiquetas</h5>
            ) : (
                <>
                    {etiquetas.map((etiquetaItem) => (
                        <div
                            key={etiquetaItem.IdEtiqueta}
                            className="contenedor-direccion"
                        >
                            <p>{etiquetaItem.Nombre}</p>
                            <p>{etiquetaItem.Descripcion}</p>
                            <p>{etiquetaItem.UrlEtiqueta}</p>
                            <button onClick={() => habilitarEditar(etiquetaItem)}>
                                Editar
                            </button>
                            <button
                                onClick={() => etiquetaEliminar(etiquetaItem.IdEtiqueta)}
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
                Anadir etiqueta
            </button>
        </>
    );
};

export default Etiquetas;
