import {
    collection,
    addDoc,
    doc,
    deleteDoc,
    getDoc,
    updateDoc, getDocs,
} from "firebase/firestore";
import {db} from "../firebase/firebase";

const coleccion = "Etiquetas";

/*CREAR ETIQUETA SIN IMAGEN*/
export const etiquetaCrear = async (formEtiqueta) => {
    try {
        await addDoc(collection(db, coleccion), {
            Nombre: formEtiqueta.nombre,
            UrlEtiqueta: formEtiqueta.urlEtiqueta,
            Descripcion: formEtiqueta.descripcion,
        });
    } catch (e) {
        console.error("Error al agregar etiqueta", e);
    }
};

/*ELIMINAR UNA ETIQUETA*/
export const etiquetaEliminar = async (idEtiqueta) => {
    await deleteDoc(doc(db, coleccion, idEtiqueta));
};

/*EDITAR ETIQUETA SIN IMAGEN*/
export const etiquetaEditar = async (formEtiqueta) => {
    const etiquetaRef = doc(db, coleccion, formEtiqueta.IdEtiqueta)
    await updateDoc(etiquetaRef, {
        Nombre: formEtiqueta.Nombre,
        UrlEtiqueta: formEtiqueta.UrlEtiqueta,
        Descripcion: formEtiqueta.Descripcion,
    });
};

/*TRAER UN DOCUMENTO*/
export const etiquetaUna = async (idEtiqueta) => {
    const etiquetaRef = doc(db, coleccion, idEtiqueta);
    const docEtiqueta = await getDoc(etiquetaRef);
    if (docEtiqueta.exists()) {
        return docEtiqueta.data();
    } else {
        console.log("No existe el documento");
    }
};

/*TRAER TODAS ETIQUETAS*/
export const etiquetasTodas = async () => {
    const etiquetaRef = collection(db, coleccion);
    const etiquetasDB = await getDocs(etiquetaRef);
    return etiquetasDB.docs.map((doc) => {
        const id = doc.id;
        return {
            IdCategoria: id,
            Nombre: doc.data().Nombre,
        };
    });
};