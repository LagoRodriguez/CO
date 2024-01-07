import "./Notificacion.css"

const Notificacion = ({
    mensajeNotificacion,
    setEstadoNotificacion,
    setMensajeEstadoNotificacion,
}) => {
    setTimeout (() => {
        setEstadoNotificacion(false);
        setMensajeEstadoNotificacion(null);
    }, 4000);
    return <div className="contenedor-notificacion"> {mensajeNotificacion}</div>;
};


export default Notificacion;