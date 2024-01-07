import { useState, useContext, useEffect } from "react";
import {db} from "../../../firebase/firebase"
import { onSnapshot, collection } from "firebase/firestore";
import {
    direccionEliminar,
    // direccionActualizar,
} from "../../../controllers/Direcciones";
import { EstadoContexto } from "../../../context/EstadoGeneral";
import DireccionModal from "./DireccionModal/DireccionModal";

import "./Direccion.css";

const Direccion = () => {
    const {usuario } = useContext(EstadoContexto);
    const [estadoModal, setEstadoModal] = useState(false);
    const [direcciones, setDirecciones] = useState([]);

    useEffect(() => {
        const rutaDireccion = `${usuario}/${usuario.IdCliente}/${direcciones}`;
        const clienteRef = collection(db, rutaDireccion);
        onSnapshot(clienteRef, (snapshot) => {
            setDirecciones(
                snapshot.docs.map((doc) => ({
                    IdDireccion: doc.id,
                    ...doc.data(),
                }))
            );
        });
    }, [usuario.IdCliente]);

    return (
        <>
            {estadoModal && (
                <DireccionModal
                    setEstadoModal={setEstadoModal}
                    IdCliente={usuario.IdCliente} // Corregido error de escritura aquí
                />
            )}
            <h4>Dirección de envío</h4>

            {direcciones?.length === 0 ? (
                <h5>No hay direcciones</h5>
            ) : (
                <>
                    {direcciones.map((direccionItem) => (
                        <div key={direccionItem.IdDireccion} className="contenedor-direccion"> {/* Corregido error de escritura aquí */}
                            <h5>
                                {direccionItem.Estado} / {direccionItem.Municipio} /{" "}
                                <span> {direccionItem.IdDireccion}</span>
                            </h5>
                            <p>{direccionItem.Direccion}</p>
                            <p>{direccionItem.Recomendacion}</p>{" "}
                            {/* Descomentar la siguiente sección cuando se defina direccionActualizar */}
                            {/* <button
                onClick={() =>
                  direccionActualizar(
                    usuario.IdCliente,
                    direccionItem.IdDireccion,
                    !direccionItem.Principal
                  )
                }
              >
                Principal
              </button> */}
                            <button
                                onClick={() =>
                                    direccionEliminar(
                                        usuario.IdCliente,
                                        direccionItem.IdDireccion
                                    )
                                }
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
                Añadir dirección
            </button>
        </>
    );
};

export default Direccion;
