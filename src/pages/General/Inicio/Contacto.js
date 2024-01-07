import React from 'react';
import {LayoutGeneral} from "../../../layout/conLayout";
import Pie from "../../../components/Pie/Pie";

function Contacto() {
    return (
        <>
            <LayoutGeneral/>
            <div className="contacto-container">
                <h3 className="titulo-contacto">Información de contacto</h3>

                <div className="contacto-info">
                    <div className="info">
                <h4>Dirección:</h4>
                <p>Rúa de Sanjurjo Badía, 193, Teis, 36207 Vigo, Pontevedra</p>

                <h4>Teléfono:</h4>
                <p>886 16 66 93</p>

                <h4>E-mail:</h4>
                <p>chocolat5agosto@gmail.com</p>

                <h4>Horario:</h4>
                <p>
                    <strong>Miércoles a viernes:</strong><br />
                    9:30–13:30 / 9:30–19:00<br />
                    <strong>Sábado:</strong><br />
                    9:00–15:00<br />
                    <strong>Domingo:</strong><br />
                    Cerrado<br />
                    <strong>Lunes y martes:</strong><br />
                    9:30–19:00
                </p>

            </div>
        </div>
    </div>

            <Pie/>
            </>
);
}

export default Contacto;
