import "./Modal.css"

    const Modal = ({ mensajeModal, setVerificandoEnvio }) => {
        return (
            <div className="contenedor-padre-modal">
                <div className="contenedor-modal">
                    <h3>Alerta</h3>
                    <p>{mensajeModal}</p>
                    <br />
                    <button onClick={() => setVerificandoEnvio(false)}>
                        Entendido
                    </button>
                </div>
            </div>
        );
    };

export default  Modal;
