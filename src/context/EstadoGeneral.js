import React, {useReducer, createContext, useEffect} from "react";
import {signOut} from "firebase/auth";
import {auth, db} from "../firebase/firebase";
import {onSnapshot, doc} from "firebase/firestore";



const estadoInicial = {
    usuario: {},
};

if (localStorage.getItem("IdToken")){
    const usuarioData = {
        Metodo: localStorage.getItem("Metodo"),
        IdCliente: localStorage.getItem("IdCliente"),
        IdToken: localStorage.getItem("IdToken,"),
        Correo: localStorage.getItem("Correo"),
        Nombres: localStorage.getItem("Nombres"),
        Apellidos: localStorage.getItem("Apellidos"),
        Genero: localStorage.getItem("Genero"),
        FechaNacimiento: localStorage.getItem("FechaNacimiento"),
        Telefono: localStorage.getItem("Telefono"),
        FotoUrl: localStorage.getItem("FotoUrl"),
        Rol: localStorage.getItem("Rol"),
    };
    estadoInicial.usuario = usuarioData;
}else {
    estadoInicial.usuario ={};
}

const EstadoContexto = createContext ({
    usuario: {},
    cerrarSesion: () => {},
    iniciarSesion: (usuarioData) => {},
});

function estadoReductor (state, action) {
    switch (action.type) {
        case "NUEVA_SESION":
            return {
                ...state,
                usuario: Object.assign(state.usuario, action.payload),
            };
        case "CERRAR_SESION":
            return {...state, usuario: {}};
            default: return state;
            }
    }
function EstadoProveedor(props) {
    const [state, dispatch] = useReducer(estadoReductor, estadoInicial);

    useEffect(() => {
        if (localStorage.getItem("IdToken")){
            const clienteRef = doc(db, "Clientes", localStorage.getItem("IdCliente"));

    onSnapshot(clienteRef, (doc) => {
        if (localStorage.getItem("IdToken") === doc.data().IdToken) {
            /*if (doc && doc.exists && localStorage.getItem("IdToken") === doc.data().IdToken) {*/
            const userData = {
        Nombres: doc.data().Nombres,
        Apellidos: doc.data().Apellidos,
        Genero: doc.data().Genero,
        FechaNacimiento: doc.data().FechaNacimiento,
        Telefono: doc.data().Telefono,
        FotoUrl: doc.data().FotoUrl,
    };
    dispatch({
        type: "NUEVA_SESION",
        payload: userData,
    });
    localStorage.setItem("Nombres", doc.data().Nombres);
    localStorage.setItem("Apellidos", doc.data().Apellidos);
    localStorage.setItem("Genero", doc.data().Genero);
    localStorage.setItem("FechaNacimiento", doc.data().FechaNacimiento);
    localStorage.setItem("Telefono", doc.data().Telefono);
    localStorage.setItem("FotoUrl", doc.data().FotoUrl);
    console.log("SI HAY USUARIO");
} else {
    console.log("NO HAY USUARIO");
    cerrarSesion();
}
});
}
}, [state.usuario]);

function iniciarSesion(usuarioData) {
console.log("usuarioData: ", usuarioData);
localStorage.setItem("Metodo", usuarioData.Metodo);
localStorage.setItem("IdCliente", usuarioData.IdCliente);
localStorage.setItem("IdToken", usuarioData.IdToken);
localStorage.setItem("Correo", usuarioData.Correo);
localStorage.setItem("Nombres", usuarioData.Nombres);
localStorage.setItem("Apellidos", usuarioData.Apellidos);
localStorage.setItem("Genero", usuarioData.Genero);
localStorage.setItem("FechaNacimiento", usuarioData.FechaNacimiento);
localStorage.setItem("Telefono", usuarioData.Telefono);
localStorage.setItem("FotoUrl", usuarioData.FotoUrl);
localStorage.setItem("Rol", usuarioData.Rol);

dispatch ({
type: "NUEVA_SESION",
payload: usuarioData,
});

}

function cerrarSesion () {
localStorage.removeItem("Metodo")
localStorage.removeItem("IdCliente")
localStorage.removeItem("IdToken")
localStorage.removeItem("Correo")
localStorage.removeItem("Nombres")
localStorage.removeItem("Apellidos")
localStorage.removeItem("Genero")
localStorage.removeItem("FechaNacimiento")
localStorage.removeItem("Telefono")
localStorage.removeItem("FotoUrl")
localStorage.removeItem("Rol")
signOut(auth)
.then(() => {
    dispatch({
        type: "CERRAR_SESION",
        usuario: {},
    });
})
.catch((error) => {
    console.log("Error cerrar sesion:", error);
});
}

return (
<EstadoContexto.Provider
value={{
    usuario: state.usuario,
    cerrarSesion,
    iniciarSesion,
}}
{...props}
/>
);
}

export {EstadoContexto, EstadoProveedor};