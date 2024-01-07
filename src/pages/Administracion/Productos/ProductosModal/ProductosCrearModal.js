import { useState, useEffect, useRef } from "react";
import { etiquetasTodas} from "../../../../controllers/Etiquetas";
import { categoriasTodas } from "../../../../controllers/Categorias";
import { productosCrearCF } from "../../../../controllers/Productos";
import GenerarUrl from "../../../../utils/GenerarUrl";

import "./Productos.css";


const initFormProducto = {
    nombre: "",
    descripcion: "",
    urlProducto: "",
    marca: "",
    precio: "",
    cantidad: "",
    tiempoEntrega: "",

};

const ProductosCrearModal = ({ setEstadoModal }) => {
    const [categorias, setCategorias] = useState ([]);
    const [categoriaSelect, setCategoriaSelect] = useState(
        "Seleccione la categoria"
    );
    const [estadoEtiqueta, setEstadoEtiqueta] = useState(false);
    const [etiquetas, setEtiquetas] = useState([]);
    const [formEtiqueta, setFormEtiqueta] = useState({});

    const [formProducto, setFormProducto] = useState(initFormProducto);

    const [fotos, setFotos] = useState([]);
    const [fotosVista, setFotosVista] = useState([]);

    const imagenRef = useRef();

    useEffect(() => {
        (async () => {
            const categoriaDB = await categoriasTodas();
            setCategorias(categoriaDB);
            const etiquetaDB = await etiquetasTodas();
            setEtiquetas(etiquetaDB);
        })();
    }, []);

    const cambiarDatosCrearProducto = (e) => {
        const { name, value } = e.target;
        setFormProducto({
            ...formProducto,
            [name]: value,
        });
    };

    const cambiarCategoria = (e) => {
        setCategoriaSelect(e.target.value);
    };
    const cambiarEtiqueta = (event) => {
        setFormEtiqueta({
            ...formEtiqueta,
            [event.target.name]: event.target.checked,
        });
    };

    function onBlur() {
        setFormProducto({
            ...formProducto,
            urlProducto: GenerarUrl(formProducto.nombre),
        });
    }

    // function escogerEtiqueta (etiquetasSeleccionadas) {
    //     const etiquetaArray = Object.entries(etiquetasSeleccionadas);
    //     const etiquetaFiltrada = etiquetaArray.filter(function ([key, value]) {
    //         return value === true;
    //     });
    //     const etiquetaFinal = Object.keys(Object.formEntries(etiquetaFiltrada));
    //     return etiquetaFinal;
    // }

    function escogerEtiqueta(etiquetasSeleccionadas) {
        const etiquetaArray = Object.entries(etiquetasSeleccionadas);
        const etiquetaFiltrada = etiquetaArray.filter(function ([key, value]) {
            return value === true;
        });
        const etiquetaFinal = Object.keys(Object.fromEntries(etiquetaFiltrada));
        return etiquetaFinal;
    }

    const cambiarFotos = (e) => {
            if (e.target.files) {
                const fotosArray = Array.from(e.target.files).map((file) =>
                    URL.createObjectURL(file)
                );
                const fotosArray2 = Array.from(e.target.files);

                setFotos((prevImages) => prevImages.concat(fotosArray));
                Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));

                setFotosVista((prevImages) => prevImages.concat(fotosArray2));
            }
        };

    const eliminarFoto = (index) => {
        if (index > -1) {
            const nuevaFotoArray = [...fotos];
            nuevaFotoArray.splice(index, 1);
            setFotos(nuevaFotoArray);

            const nuevaFotosVistaArray = [...fotosVista];
            nuevaFotosVistaArray.splice(index, 1);
            setFotosVista(nuevaFotosVistaArray);

            if (nuevaFotoArray.length === 0) {
                console.log("No hay fotos");
                if (imagenRef.current) {
                    imagenRef.current.value = "";
                }
            }
        }
    };

    const crearProducto = (e) => {
        e.preventDefault();
        if (fotosVista.length !== 0) {
            const etiquetaFinal = escogerEtiqueta(formEtiqueta);
            productosCrearCF(formProducto, categoriaSelect, etiquetaFinal, fotosVista);
            setCategoriaSelect("Seleccione la categoria");
            setFormEtiqueta({});
            setFormProducto(initFormProducto);
            setFotos([]);
            setFotosVista([]);
            imagenRef.current.value = "";
            setEstadoModal(false);
        } else {
            console.log("Anade imagen");
        }
    };

    return (
        <div className="contenedor-padre-modal">
            <div className="contenedor-modal">
                <div>
                    {" "}
                    <button onClick={() => setEstadoModal(false)}>X</button>
                </div>
                <h2> Crear Producto</h2>

                <form onSubmit={crearProducto}>
                    <input
                        type="text"
                        required
                        name="nombre"
                        placeholder="Nombre de producto"
                        value={formProducto.nombre}
                        onChange={cambiarDatosCrearProducto}
                        onBlur={onBlur}
                    />
                    <input
                        type="text"
                        required
                        disabled
                        defaultValue={GenerarUrl(formProducto.nombre)}
                        placeholder="URL producto generado."
                    />
                    <select onChange={cambiarCategoria} value={categoriaSelect}>
                    <option disabled value={"Seleccione la categoria"}>
                        Seleccione la categoria
                    </option>
                        {categorias.map((categoria) => (
                            <option key={categoria.IdCategoria} value={categoria.Nombre}>
                                {categoria.Nombre}
                            </option>
                        ))}
                </select>
                    <div className="contenedor-check"
                         style={{
                             display:
                                 estadoEtiqueta && etiquetas.length !== 0 ? "block" : "none",
                         }}
                    >
                        {etiquetas.map((etiqueta) => (
                            <label key={etiqueta.IdEtiqueta}>
                                {etiqueta.Nombre}
                                <input
                                    type="checkbox"
                                    name={etiqueta.Nombre}
                                    checked={formEtiqueta[etiqueta.IdEtiqueta]}
                                    onChange={cambiarEtiqueta}
                                />
                            </label>
                        ))}
                </div>
                    <input
                    type="text"
                    required
                    name="marca"
                    placeholder="Marca del producto"
                    value={formProducto.marca}
                    onChange={cambiarDatosCrearProducto}
                />
                <input
                    type="number"
                    required
                    name="precio"
                    placeholder="Precio del producto"
                    step={1}
                    precision={2}
                    min={1}
                    value={formProducto.precio}
                    onChange={cambiarDatosCrearProducto}
                />
                <input
                    type="number"
                    required
                    name="cantidad"
                    placeholder="Cantidad de producto"
                    step={1}
                    min={1}
                    value={formProducto.cantidad}
                    onChange={cambiarDatosCrearProducto}
                />
                <input
                    type="number"
                    required
                    name="tiempoEntrega"
                    placeholder="Tiempo de entrega"
                    step={1}
                    min={1}
                    value={formProducto.tiempoEntrega}
                    onChange={cambiarDatosCrearProducto}
                />
                <textarea
                    type="descripcion"
                    required
                    cols="30"
                    rows="2"
                    placeholder="Descripcion del producto"
                    // defaultValue={formProducto.descripcion}
                    // onChange={cambiarDatosCrearProducto}
                    defaultValue={formProducto.descripcion} // Usa defaultValue en lugar de value
                    onChange={(e) => setFormProducto({ ...formProducto, descripcion: e.target.value })} // Maneja los cambios
                ></textarea>
                <br/>
                <input
                    ref={imagenRef}
                    type="file"
                    id="file"
                    required
                    multiple
                    onClick={cambiarFotos}
                />
                <div className="contenedor-imagenes-categorias">
                    <div className="contenedor-card-categorias">
                        {fotos.map((photo, index) => (
                            <div key={index}>
                                <img src={photo} alt=""/>
                                <div
                                    onClick={() => eliminarFoto(index)}
                                    className={"boton-eliminar"}
                                >
                                    Eliminar
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <input type="submit" value="Enviar"/>
            </form>
            <br/>
        </div>
</div>
    );
};

export default ProductosCrearModal;