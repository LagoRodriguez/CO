import {useState} from "react";
import {categoriaEditar} from "../../../../controllers/Categorias";
import GenerarUrl from "../../../../utils/GenerarUrl";
//import "./CategoriasModal.css";

const initFormCategoria = {
    nombre: "",
    descripcion: "",
    urlCategoria: "",
};

const CategoriasEditarModal = ({
   setEstadoModalEditar,
   categoriaSeleccionada,
}) => {
    const [formCategoria, setFormCategoria] = useState(categoriaSeleccionada);
    const cambiarDatosEditarCategoria = (e) => {
        const { name, value } = e.target;
        setFormCategoria({
            ...formCategoria,
            [name]: value,
        });
    };

    function onBlur() {
        setFormCategoria({
            ...formCategoria,
            UrlCategoria: GenerarUrl(formCategoria.Nombre),
        });
    }

    const editarCategoria = (e) => {
        e.preventDefault();
        categoriaEditar(formCategoria);
        setFormCategoria(initFormCategoria);
        setEstadoModalEditar(false);
    };

    return (
        <div className="contenedor-padre-modal">
            <div className="contenedor-modal"> {/* Corregido el nombre de la clase */}
                <div>
                    {" "}
                    <button onClick={() => setEstadoModalEditar(false)}>X</button>
                </div>

                <form onSubmit={editarCategoria}>
                    <input
                        type="text"
                        required
                        name="nombre"
                        placeholder="Nombre de categoria"
                        value={formCategoria.Nombre}
                        onChange={cambiarDatosEditarCategoria}
                        onBlur={onBlur}
                    />
                    <input
                        type="text"
                        required
                        disabled
                        defaultValue={GenerarUrl(formCategoria.Nombre)}
                        placeholder="URL categoria generado."
                    />
                    <textarea
                        name="Descripcion"
                        required
                        cols="30"
                        rows="2"
                        placeholder="Descripcion de la categoria"
                        value={formCategoria.Descripcion}
                        onChange={cambiarDatosEditarCategoria}
                    ></textarea>
                    <input type="submit" value="Enviar" />
                </form>
                <br />
            </div>
        </div>
    );
};

export default CategoriasEditarModal;
