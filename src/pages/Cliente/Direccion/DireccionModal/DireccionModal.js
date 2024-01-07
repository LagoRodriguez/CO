import { useState, useEffect } from "react";
import { direccionCrear } from "../../../../controllers/Direcciones";

import "./DireccionModal.css";

const initFormDireccion = {
    Provincia: "",
    Municipio: "",
    CodPostal: "",
    Calle: "",
    Recomendacion: "",
};

const DireccionModal = ({ setEstadoModal, IdCliente }) => {
    const [formDireccion, setFormDireccion] = useState(initFormDireccion);

    const cambiarDatosFormDireccion = (e) => {
        const { name, value } = e.target;
        setFormDireccion({
            ...formDireccion,
            [name]: value,
        });
    };

    const guardarDireccion = (e) => {
        e.preventDefault();
        direccionCrear(IdCliente, formDireccion);
        setFormDireccion(initFormDireccion);
        setEstadoModal(false);
    };

    return (
        <div className="contenedor-padre-modal">
            <form className="contenedor-modal" onSubmit={guardarDireccion}>
                <div>
                    {" "}
                    <button onClick={() => setEstadoModal(false)}>X</button>
                </div>
                <input
                    type="text"
                    required
                    name="provincia"
                    placeholder="Provincia"
                    value={formDireccion.provincia}
                    onChange={cambiarDatosFormDireccion}
                />
                <input
                    type="text"
                    required
                    name="municipio"
                    placeholder="Municipio"
                    value={formDireccion.municipio}
                    onChange={cambiarDatosFormDireccion}
                />
                <input
                    type="text"
                    required
                    name="codPostal"
                    placeholder="Codigo postal"
                    value={formDireccion.codPostal}
                    onChange={cambiarDatosFormDireccion}
                />
                <input
                    type="text"
                    required
                    name="calle"
                    placeholder="Calle"
                    value={formDireccion.calle}
                    onChange={cambiarDatosFormDireccion}
                />
                <textarea
                    name="recomendacion"
                    required
                    cols="30"
                    rows="2"
                    placeholder="Recomendaciones de envio"
                    value={formDireccion.recomendacion}
                    onChange={cambiarDatosFormDireccion}
                ></textarea>
                <input type="submit" value="Enviar" />
            </form>
            <br />
            <br />
        </div>
    );
};

export default DireccionModal;
