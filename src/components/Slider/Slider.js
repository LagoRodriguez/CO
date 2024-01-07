import React, {useEffect, useRef} from 'react'
import {Link} from 'react-router-dom';
import "./Slider.css";

const slider = [
    {
        id: 111,
        nombre: "Maletin",
        description: "Sport FIT",
        color: "#2e311c",
        imgURL: "/images/Principal.jpg",
        link: "Principa",
    },
];

const Slider = () => {
    const videoRef = useRef(null);

    const handleVideoEnded = () => {
        if (videoRef.current) {
            videoRef.current.pause(); // Pausa el video al finalizar
        }
    };

    return (
        <div className="contenido-slider">
            <div className="video-container">
                <video
                    autoPlay
                    muted
                    className="video-slider"
                    ref={videoRef}
                    onEnded={handleVideoEnded} // Manejador de evento 'ended'
                >
                    <source src="/videos/videoPrincipal.mp4" type="video/mp4" />
                    Tu navegador no admite la etiqueta de video.
                </video>
            </div>
            <div className="contenido-slider-descripcion">
                <h2> ¿Qué necesitas?</h2>
                <div className="contenedor-slider-botones">
                     <button>
                         <Link to="/tienda">Productos</Link>
                    </button>
                    <button>
                        <Link to="/tienda">Servicios</Link>
                    </button>
                 </div>
              </div>
            </div>
    );
};

export default Slider;