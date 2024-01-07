import {doc, setDoc, deleteDoc, updateDoc} from "firebase/firestore";
import {db} from "../firebase/firebase";

const coleccion = "Clientes";
const subColeccion = "Direcciones";

export const direccionCrear = async (IdCliente, formDireccion, direccionEnvio) => {
    const IdDireccion = `00${Date.now()}`;
    const coleccion = "Clientes";
    const subColeccion = "Direcciones";

    const rutaDireccion = `${coleccion}/${IdCliente}/${subColeccion}`;
    const direccionRef = doc(db, rutaDireccion, IdDireccion);

    try {
        await setDoc(direccionRef, {
            Provincia: formDireccion.provincia,
            Municipio: formDireccion.municipio,
            CodPostal: formDireccion.codPostal,
            Calle: formDireccion.calle,
            Recomendacion: formDireccion.recomendacion,
        });
        console.log("NUEVA_DIRECCION");
    } catch (e) {
        console.error("No se pudo agregar", e);
    }
};


export const direccionEliminar = async (IdCliente, IdDireccion) => {
    const rutaDireccion = '${coleccion}/${IdCliente}/${subColeccion}';
    const direccionesRef = doc(db, rutaDireccion, IdDireccion);
    await deleteDoc(direccionesRef);
};

export const direccionActualizar = async (IdCliente, IdDireccion, Principal) => {
    const rutaDireccion = '${coleccion}/${IdCliente}/${subColeccion}';
    const direccionesRef = doc(db, rutaDireccion, IdDireccion);
    await updateDoc(direccionesRef, {
        Principal: Principal,
});
};
