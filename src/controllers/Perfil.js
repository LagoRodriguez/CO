import {doc, updateDoc} from "firebase/firestore";
import {db} from "../firebase/firebase";

const coleccion = "Clientes";

export const editarPerfilSoloDatos = async (formCliente) => {
    const perfilRef = doc(db, coleccion, formCliente.idCliente);

    await updateDoc(perfilRef, {
        Nombres: formCliente.nombres,
        Apellidos: formCliente.apellidos,
        Telefono: formCliente.telefono,
    });
};