import {useEffect, useRef, useState} from "react";
import {categoriaEditar, categoriasTodas} from "../../../../controllers/Categorias";
import GenerarUrl from "../../../../utils/GenerarUrl";
import {etiquetasTodas} from "../../../../controllers/Etiquetas";
import {productoEditarSF} from "../../../../controllers/Productos";

import "./Productos.css";

const initFormProducto = {
    Nombre: "",
    Descripcion: "",
    UrlProducto: "",
    Marca: "",
    Precio: 0,
    Cantidad: 0,
    TiempoEntrega: 0,
};

const ProductosEditarModal = ({
   setEstadoModalEditar,
   productoSeleccionado,
}) => {
    const [categorias, setCategorias] = useState([]);
    const[categoriaSelect, setCategoriaSelect] = useState(
        productoSeleccionado.Categoria
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
            var etiquetaGuardar = productoSeleccionado.Etiqueta.reduce(
                (json, value, key) => {
                    json[value] = true;
                    return json;
                },
                {}
            );
            setFormEtiqueta(etiquetaGuardar)
            setFotos(productoSeleccionado.ImagenUrl);
            setFotosVista(productoSeleccionado.ImagenUrl);

            const categoriaDB = await categoriasTodas();
            setCategorias(categoriaDB);
            const etiquetaDB = await etiquetasTodas();
            setEtiquetas(etiquetaDB);
        })();
    }, [productoSeleccionado]);

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
            setFormEtiqueta( {
                ...formEtiqueta,
                    [event.target.name]: event.target.checked,
            });
        };
    function onBlur() {
        setFormProducto({
            ...formProducto,
            UrlProducto: GenerarUrl(formProducto.Nombre),
        });
    }

    function escogerEtiqueta(etiquetasSeleccionadas) {
        const etiquetaArray = Object.entries(etiquetasSeleccionadas);
        const etiquetaFiltrada = etiquetaArray.filter(function ([key,value]) {
            return value === true;
        });

        const etiquetasEnviar = Object.Keys(Object.fromEntries(etiquetaFiltrada));
        return etiquetasEnviar;
    }
    const cambiarFotos = (e) => {
        if (e.target.files) {
            const fotosArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );

            const fotosArray2 = Array.from(e.target.files);
            setFotos((prevImages) => prevImages.concat(fotosArray));
            Array.from(e.target.files).map((file) =>
                URL.revokeObjectURL(file));

            setFotosVista((prevImages) => prevImages.concat(fotosArray2));
        }
    };
     const eliminarFoto = (index) => {
         console.log(index);
         if (index > -1) {
             const nuevaFotoArray = [...fotos];
             nuevaFotoArray.splice(
                 nuevaFotoArray.findIndex((item) => item.id === index),
                 1
             );

             setFotos(nuevaFotoArray);
             const nuevaFotoArray2 = [...fotosVista];
             nuevaFotoArray2.splice(
                 nuevaFotoArray2.findIndex((item) => item.id === index),
                 1
             );
             setFotosVista(nuevaFotoArray2);
             if (nuevaFotoArray.length === 0) {
                 console.log("No hay nada");
                 imagenRef.current.value = "";
             }
         }
     };

     function igualarEtiqueta (formEtiqueta, etiquetaMap) {
         var verifica = false;
         Object.entries(formEtiqueta).forEach(([key, value]) => {
             if (key === etiquetaMap && value === true) {
                 verifica = true;
                 return true;
             } else {
                 return false;
             }
         });
         return verifica;
     }

     function buscarImg(letra) {
         var similar = fotos.filter((objeto) => {
             return objeto.includes(letra);
         });
         return similar;
     }

     const editarProducto = (e) => {
         e.preventDefault();
         if (fotosVista.length !==0) {
             const etiquetaFinal = escogerEtiqueta(formEtiqueta);
             const fotosAntiguas = buscarImg("firebasestorage");
             const buscarImgBlob = buscarImg("blob")

             if (buscarImgBlob.length === 0) {
                 productoEditarSF(
                     formProducto,
                     categoriaSelect,
                     etiquetaFinal,
                     fotosVista
                 );
             } else if (buscarImgBlob.length !== 0) {
                 const fotosNuevas = fotosVista.splice(
                     fotosAntiguas.length,
                     buscarImgBlob.length
                 );
             }
             setCategoriaSelect("Seleccione la categoria");
             setFormEtiqueta({});
             setFormProducto(initFormProducto);
             setFotos([]);
             setFotosVista([]);
             imagenRef.current.value = "";
             setEstadoModalEditar(false);
         } else {
             console.log("Anade imagen");
         }
     };

    return (
        <div className="contenedor-padre-modal">
            <div className="contenedor-modal">
                <div>
                    {" "}
                    <button onClick={() => setEstadoModalEditar(false)}>X</button>
                </div>
                <h2>Editar Producto</h2>

                <form onSubmit={editarProducto}>
                    <input
                        type="text"
                        required
                        name="Nombre"
                        placeholder="Nombre de producto"
                        value={formProducto.Nombre}
                        onChange={editarProducto}
                        onBlur={onBlur}
                    />
                    <input
                        type="text"
                        required
                        disabled
                        defaultValue={GenerarUrl(formProducto.Nombre)}
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
                    <div>
                        <div className="contenedor-select"
                             onClick={() => setEstadoEtiqueta(!estadoEtiqueta)}
                        >
                            <select>
                                {etiquetas?.length === 0 ? (
                                    <option defaultValue={false}>No tiene etiquetas</option>
                                ) : (
                                    <option>Seleccione una etiqueta</option>
                                )}
                            </select>
                            <div className="ocultar-select"></div>
                        </div>
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
                                        checked={igualarEtiqueta(formEtiqueta, etiqueta.nombre)}
                                        onChange={cambiarEtiqueta}
                                    />
                                </label>
                            ))}
                        </div>
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
                        value={formProducto.descripcion}
                        onChange={cambiarDatosCrearProducto}
                    ></textarea>

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


export default ProductosEditarModal;
