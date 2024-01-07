import {
    collection,
    addDoc,
    doc,
    deleteDoc,
    getDoc,
    updateDoc, getDocs,
} from "firebase/firestore";
import {db} from "../firebase/firebase";

const coleccion = "categorias";

/*CREAR CATEGORIA SIN IMAGEN*/
export const categoriaCrear = async (formCategoria) => {
    try {
        await addDoc(collection(db, coleccion), {
            Nombre: formCategoria.nombre,
            UrlCategoria: formCategoria.urlCategoria,
            Descripcion: formCategoria.descripcion,
        });
    } catch (e) {
        console.error("Error al agregar categoria", e);
    }
};

/*ELIMINAR UNA CATEGORIA*/
export const categoriaEliminar = async (idCategoria) => {
    await deleteDoc(doc(db, coleccion, idCategoria));
};

/*EDITAR CATEGORIA SIN IMAGEN*/

export const categoriaEditar = async (formCategoria) => {
    const categoriaRef = doc(db, coleccion, formCategoria.IdCategoria)
    await updateDoc(categoriaRef, {
        Nombre: formCategoria.Nombre,
        UrlCategoria: formCategoria.UrlCategoria,
        Descripcion: formCategoria.Descripcion,
    });
};

/*TRAER UN DOCUMENTO*/
export const categoriaUna = async (idCategoria) => {
    const categoriaRef = doc(db, coleccion, idCategoria);
    const docCategoria = await getDoc(categoriaRef);
    if (docCategoria.exists()) {
        return docCategoria.data();
    } else {
        console.log("No existe el documento");
    }
};

/*TRAER TODAS CATEGORIAS*/
// export const categoriasTodas = async () => {
//     const categoriaRef = collection(db, coleccion);
//     const categoriasDB = await getDocs(categoriaRef);
//     return categoriasDB.docs.map((doc) => {
//         const id = doc.id;
//         return {
//             IdCategoria: id,
//             Nombre: doc.data().Nombre,
//         };
//     });
//
// };
export const categoriasTodas = async () => {
    try {
        const categoriaRef = collection(db, coleccion);
        const categoriasDB = await getDocs(categoriaRef);
        const categorias = categoriasDB.docs.map((doc) => {
            const id = doc.id;
            return {
                IdCategoria: id,
                Nombre: doc.data().Nombre,
            };
        });
        console.log('Categorías:', categorias); // Mostrar las categorías obtenidas en la consola
        return categorias;
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        throw error; // Asegúrate de manejar el error según las necesidades de tu aplicación
    }
}
