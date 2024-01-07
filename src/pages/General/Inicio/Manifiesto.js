
import {LayoutGeneral} from "../../../layout/conLayout";

const Manifiesto = () => {
    return (
        <>
        <LayoutGeneral/>

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                <h1 style={{ textAlign: 'center' }}>Valores y compromisos Chocolat</h1>
            {/* Sección de Valores */}
                <br/>
                <div>
                <h2>Valores</h2>
                <p><strong>Cercanía y Hospitalidad:</strong> Cada cliente es parte de nuestra familia. Desde el momento en que cruzas nuestras puertas, te recibimos con calidez y amabilidad.</p>
                <p><strong>Profesionalismo y Experiencia:</strong> Con más de 10 años de experiencia, nuestra dedicación y habilidades se reflejan en cada servicio que ofrecemos.</p>
                <p><strong>Confianza y Escucha Activa:</strong> Escuchamos tus deseos y necesidades. Nuestro objetivo es no solo satisfacer, sino superar tus expectativas.</p>
            </div>
            <br/>
                {/* Sección de Compromisos */}
            <div>
                <h2>Compromisos con Nuestros Clientes</h2>
                <p><strong>Excelencia en el Servicio:</strong> Cada corte, color o tratamiento se realiza con la más alta calidad y atención al detalle.</p>
                <p><strong>Comunidad y Apoyo:</strong> Estamos arraigados en la comunidad. Apoyamos eventos locales y causas que importan a nuestros clientes.</p>
                <p><strong>Innovación Responsable:</strong> Buscamos lo último en tendencias y técnicas, siempre priorizando la salud y el bienestar de tu cabello.</p>
            </div>
            <br/>
            {/* Sección de Promesa */}
            <div>
                <h2>Nuestra Promesa</h2>
                <p>En nuestra peluquería familiar, no solo transformamos tu apariencia, sino que también queremos mejorar tu día. Más que una visita, es una experiencia que recordarás.</p>
                <p>Gracias por confiar en nosotros durante estos 10 años. Aquí estamos, listos para seguir siendo tu destino de confianza para la belleza y el cuidado del cabello.</p>
            </div>
        </div>
        </>
    );
};

export default Manifiesto;
