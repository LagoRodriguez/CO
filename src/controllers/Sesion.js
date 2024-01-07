import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../firebase/firebase";
import Registrar from "../pages/General/Entrar/Registrar";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    checkActionCode,
    applyActionCode,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    verifyPasswordResetCode,
    confirmPasswordReset,

} from "firebase/auth";
import {getDefaultNormalizer} from "@testing-library/react";

const auth = getAuth();

const coleccion = "Clientes";

export const registrarCliente = async (formRegistrar, clienteID) => {
    try {
        //console.log(formRegistrar, clienteID);
        await setDoc(doc(db, coleccion, clienteID), {
            Correo: formRegistrar.correo,
            Metodo: "correo",
            Confirmacion: false,
            Rol: "cliente"
        });
    } catch (e) {
        console.error("Error al registrar cliente", e);
    }
};

export const registrarClienteAuth = (formRegistrar) => {
    return createUserWithEmailAndPassword(
        auth,
        formRegistrar.correo,
        formRegistrar.contrasena
    )
        .then((userCredential) => {
            console.log("Credenciales: ", userCredential)
            const clienteID = userCredential.user.uid;
            return sendEmailVerification(userCredential.user).then(() => {
                registrarCliente(formRegistrar, clienteID);
            return "Correcto";
        });
})

.catch((error) => {
    if (error.code === "auth/email-already-in-use") {
        return "Repetido";
    } else if (error.code === "auth/weak-password") {
        return "Contrasena";
    }
});
};

export const verificarCuentaCorreo = (actionCode) => {
    var correoCliente = null;
    return checkActionCode(auth, actionCode)
        .then((info) => {
            console.log("Info: ", info)
            correoCliente = info["data"]["email"];
            applyActionCode(auth, actionCode);
            return  correoCliente
        })
        .catch((error) => {
            if(error.code === "auth/invalid-action-code") {
                return "expirado";
            } else {
                return "error";
            }
        });
};

export const ingresarClienteAuth = (formIngresar) => {
    return signInWithEmailAndPassword(
        auth,
        formIngresar.correo,
        formIngresar.contrasena
    )
        .then((userCredential) => {
            const correoVerificado = userCredential.user.emailVerified;
            const usuario = {
                idUsuario: userCredential.user.uid,
                token: userCredential.user.accesstoken,
            };
            if (correoVerificado) {
                return usuario;
            } else {
                return "noVerificado";
            }
            })
        .catch ((error) => {
            if (error.code === "auth/wrong-password") {
                return "contrasena incorrecta";
            } else {
            return "error";
            }
        });
        };

export const clienteEditarToken = async (idUsuario, token) => {
    const clienteRef = doc(db, coleccion, idUsuario);
    await updateDoc(clienteRef, {IdToken: token});
};
export const traerUnCliente = async (usuarioVerificado) => {
    const idUsuario = usuarioVerificado.idUsuario;
    const token = usuarioVerificado.token;
    const idTokenLS = localStorage.getItem('idToken');

    const clienteRef = doc (db, coleccion, idUsuario);
    const docCliente = await getDoc (clienteRef);

    if(docCliente.exists()){
        if (idTokenLS && idTokenLS === docCliente.data().IdToken){

            return {
                IdCliente: idUsuario,
                ...docCliente.data(),
            };
        } else {
            clienteEditarToken(idUsuario,token);
            return {
                Metodo: docCliente.data.Metodo,
                IdCliente: idUsuario,
                IdToken: token,
                Correo: docCliente.data().Correo,
                Confirmacion: docCliente.data().Confirmacion,
                Rol:docCliente.data().Rol,
            };
        }
        } else {
            console.log ("No existe el documento");
    }
    };
export const recuperarContrasena = (formCorreo) => {
    return sendPasswordResetEmail(auth, formCorreo)
        .then (() => {
            return "correcto";
        })
        .catch (() => {
            return "error";
    });

};

export const actualizarCuentaContrasena = (actionCode, formContrasena) => {
    return verifyPasswordResetCode (auth, actionCode)
        .then (() => {
            console.log(actionCode);
            console.log(formContrasena);
            return confirmPasswordReset(auth, actionCode, formContrasena)
                .then(() => {
                    return "cambiado";
                })
                .catch(()=> {
                    return "no";
                });
            })
        .catch(()=> {
            return "error";
    });
}