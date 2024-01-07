import { useState } from "react";
import { etiquetaCrear } from "../../../../controllers/Etiquetas";
import GenerarUrl from "../../../../utils/GenerarUrl";
//import "./EtiquetasModal.css";

const initFormEtiqueta = {
    nombre: "",
    descripcion: "",
    urlEtiqueta: "",
};

const EtiquetaCrearModal = ({ setEstadoModal }) => {
    const [formEtiqueta, setFormEtiqueta] = useState(initFormEtiqueta);

    const cambiarDatosCrearEtiqueta = (e) => {
        const { name, value } = e.target;
        setFormEtiqueta({
            ...formEtiqueta,
            [name]: value,
        });
    };

    function onBlur() {
        setFormEtiqueta({
            ...formEtiqueta,
            urlProducto: GenerarUrl(formEtiqueta.nombre),
        });
    }

    const crearEtiqueta = (e) => {
        e.preventDefault();
        etiquetaCrear(formEtiqueta);
        setFormEtiqueta(initFormEtiqueta);
        setEstadoModal(false);
    };

    return (
        <div className="contenedor-padre-modal">
            <div className="contenedor-modal">
                <div>
                    {" "}
                    <button onClick={() => setEstadoModal(false)}>X</button>
                </div>

                <form onSubmit={crearEtiqueta}>
                    <input
                        type="text"
                        required
                        name="nombre"
                        placeholder="Nombre de etiqueta"
                        value={formEtiqueta.nombre}
                        onChange={cambiarDatosCrearEtiqueta}
                        onBlur={onBlur}
                    />
                    <input
                        type="text"
                        required
                        disabled
                        defaultValue={GenerarUrl(formEtiqueta.nombre)}
                        placeholder="URL etiqueta generado."
                    />
                    <textarea
                        name="descripcion"
                        required
                        cols="30"
                        rows="2"
                        placeholder="Descripcion de la etiqueta"
                        value={formEtiqueta.descripcion}
                        onChange={cambiarDatosCrearEtiqueta}
                    ></textarea>
                    <input type="submit" value="Enviar" />
                </form>
                <br />
            </div>
        </div>
    );
};

export default EtiquetaCrearModal;
