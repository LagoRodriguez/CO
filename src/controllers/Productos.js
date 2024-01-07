import {
    collection,
    addDoc,
    doc,
    deleteDoc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {db} from "../firebase/firebase";

const coleccion = "Productos";
const rutaFoto = "productos-imagenes";

/*CREAR PRODUCTOS SIN IMAGEN*/
export const productoCrearSF = async (
    formProducto,
    categoriaSelect,
    etiquetaFinal,
    fotosSubir
) => {
    try {
        await addDoc(collection(db, coleccion), {
            Nombre: formProducto.nombre,
            Marca: formProducto.marca,
            UrlProductos: formProducto.urlProducto,
            Precio: formProducto.precio,
            Cantidad: formProducto.cantidad,
            TiempoEntrega: formProducto.tiempoEntrega,
            Categoria: categoriaSelect,
            Etiqueta: etiquetaFinal,
            ImagenUrl: fotosSubir,
        });
    } catch (e) {
        console.error("Error al agregar producto", e);
    }
};

/*SUBIR UNA IMAGEN*/
export const productosCrearCF = (
    formProducto,
    categoriaSelect,
    etiquetaFinal,
    fotosVista
) => {
    const promises = fotosVista.map((file) => {
        const fechaAhora = Date.now();
        const rutaCompleta = file.name + fechaAhora + file.lastModified + file.size;
        const storage = getStorage();
        const imageRef = ref(storage, `${rutaFoto}/${rutaCompleta}`);
        return uploadBytes(imageRef, file)
            .then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            })
            .catch((error) => {
                console.error("Error al subir imagenes", error)
            });
    });
    Promise.all(promises)
        .then((linkImagenes) => {
        productoCrearSF(
            formProducto,
            categoriaSelect,
            etiquetaFinal,
            linkImagenes
        );
    })
        .catch(() => {
        return "Hubo un error";
});
};

// export const productosCrearCF = async (
//     formProducto,
//     categoriaSelect,
//     etiquetaFinal,
//     fotosVista
// ) => {
//     try {
//         const promises = fotosVista.map((file) => {
//             const fechaAhora = Date.now();
//             const rutaCompleta = file.name + fechaAhora + file.lastModified + file.size;
//             const storage = getStorage();
//             const imageRef = ref(storage, `${rutaFoto}/${rutaCompleta}`);
//             return uploadBytes(imageRef, file)
//                 .then((snapshot) => {
//                     return getDownloadURL(snapshot.ref);
//                 })
//                 .catch((error) => {
//                     console.error("Error al subir imágenes", error);
//                     throw error;
//                 });
//         });
//
//         const linkImagenes = await Promise.all(promises);
//         await productoCrearSF(formProducto, categoriaSelect, etiquetaFinal, linkImagenes);
//     } catch (error) {
//         console.error("Hubo un error", error);
//         throw error;
//     }
// };

/*ELIMINAR UN PRODUCTO*/
// export const productoEliminar = async (IdProducto) => {
//     await deleteDoc(doc(db, coleccion, IdProducto));
// };

export const productoEliminar = async (IdProducto) => {
    try {
        const productoRef = doc(db, coleccion, IdProducto);
        const docSnapshot = await getDoc(productoRef);

        if (docSnapshot.exists()) {
            await deleteDoc(productoRef);
            console.log("Documento eliminado correctamente");
        } else {
            console.log("El documento no existe");
        }
    } catch (error) {
        console.error("Error al intentar eliminar el documento:", error);
    }
};
export const productoUno = async (idProducto) => {
    const productoRef = doc(db, coleccion, idProducto);
    const docProducto = await getDoc(productoRef);
    if (docProducto.exists()) {
        return docProducto.data();
    } else {
        console.log("No existe el documento");
    }
};

/*EDITAR PRODUCTO SIN IMAGEN*/
export const productoEditarSF = async (
    formProducto,
    categoriaSelect,
    etiquetaFinal,
    fotosAntiguas
) => {
    const categoriaRef = doc(db, coleccion, formProducto.IdProducto)
    await updateDoc(categoriaRef, {
        Nombre: formProducto.Nombre,
        Marca: formProducto.Marca,
        UrlProductos: formProducto.UrlProducto,
        Descripcion: formProducto.Descripcion,
        Precio: formProducto.Precio,
        Cantidad: formProducto.Cantidad,
        TiempoEntrega: formProducto.TiempoEntrega,
        Categoria: categoriaSelect,
        Etiqueta: etiquetaFinal,
        ImagenUrl: fotosAntiguas,
    });
};

/*EDITAR PRODUCTO CON FOTO*/
export const productoEditarCF = (
    formProducto,
    categoriaSelect,
    etiquetaFinal,
    fotosAntiguas,
    fotosVista
) => {
    const promises = fotosVista.map((file) => {
        const fechaAhora = Date.now();
        const rutaCompleta = file.name + fechaAhora + file.lastModified + file.size;
        const storage = getStorage();
        const imageRef = ref(storage, `${rutaFoto}/${rutaCompleta}`);
        return uploadBytes(imageRef, file)
            .then((snapshot) => {
                return getDownloadURL(snapshot.ref);
            })
            .catch((error) => {
                console.error("Error al subir imagenes", error)
            });
    });
    Promise.all(promises)
        .then((linkImagenes) => {
            const  fotosSubir =
                fotosAntiguas.length === 0
                    ? linkImagenes
                    : fotosAntiguas.concat(linkImagenes);
            productoEditarSF(
                formProducto,
                categoriaSelect,
                etiquetaFinal,
                fotosSubir
            );
        })
        .catch(() => {
            return "Hubo un error";
        });
};

/*TRAER TODOS LOS PRODUCTOS*/
export const todosProductos = async () => {
    const productosRef = collection(db, coleccion);
    const productosDB = await getDocs(productosRef);
    return productosDB.docs.map((doc) => {
        return {
            IdProducto: doc.id,
            ...doc.data(),
        };
    });
};