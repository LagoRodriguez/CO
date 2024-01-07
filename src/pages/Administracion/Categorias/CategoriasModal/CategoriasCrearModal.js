import {useEffect, useState} from "react";
import {categoriaCrear, categoriasTodas} from "../../../../controllers/Categorias";
import GenerarUrl from "../../../../utils/GenerarUrl";

import "../Categorias.css";
import {etiquetasTodas} from "../../../../controllers/Etiquetas";


const initFormCategoria = {
    nombre: "",
    descripcion: "",
    urlCategoria: "",
};

const CategoriasCrearModal = ({ setEstadoModal }) => {
    const [formCategoria, setFormCategoria] = useState(initFormCategoria);

    const cambiarDatosCrearCategoria = (e) => {
        const { name, value } = e.target;
        setFormCategoria({
            ...formCategoria,
            [name]: value,
        });
    };

    function onBlur() {
        setFormCategoria({
            ...formCategoria,
            urlCategoria: GenerarUrl(formCategoria.nombre),
        });
    }

    const crearCategoria = (e) => {
        e.preventDefault();
        categoriaCrear(formCategoria);
        setFormCategoria(initFormCategoria);
        setEstadoModal(false);
    };


    //
    // useEffect(() => {
    //     (async () => {
    //         const categoriaDB = await categoriasTodas();
    //         setCategorias(categoriaDB);
    //
    //     })();
    // }, []);

    return (
        <div className="contenedor-padre-modal">
            <div className="contenedor-modal">
                <br/>
                <div>
                    {" "}
                    <button onClick={() => setEstadoModal(false)}>X</button>
                </div>
                <h2> Crear Categoria</h2>
                <form onSubmit={crearCategoria}>
                    <input
                        type="text"
                        required
                        name="nombre"
                        placeholder="Nombre de categoria"
                        value={formCategoria.nombre}
                        onChange={cambiarDatosCrearCategoria}
                        onBlur={onBlur}
                    />
                    <input
                        type="text"
                        required
                        disabled
                        defaultValue={GenerarUrl(formCategoria.nombre)}
                        placeholder="Generando URL..."
                    />
                    <textarea
                        name="descripcion"
                        required
                        cols="30"
                        rows="2"
                        placeholder="Descripción de la categoria"
                        value={formCategoria.descripcion}
                        onChange={cambiarDatosCrearCategoria}
                    ></textarea>
                    <br/>
                    <br/>
                    <input type="submit" value="Enviar"/>
                </form>
            </div>
        </div>
    );
};

export default CategoriasCrearModal;
