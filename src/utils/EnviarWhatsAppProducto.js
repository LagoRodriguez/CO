export default function EnviarWhatsAppProducto(producto) {
        const urlProducto = `http://localhost:3001/producto/${producto.UrlProducto}`;
        const saltoLinea = "%0D%0A";
        const numeroTelefono = "691626728";
        const textoMensaje = `Hola Chocolat, quiero comprar:${saltoLinea}-${producto.Nombre} a S/.${producto.Precio}.00${saltoLinea}${urlProducto}`;
        const urlWhatsApp = `https://api.whatsapp.com/send?phone=34${numeroTelefono}&text=${encodeURIComponent(textoMensaje)}`;
        window.open(urlWhatsApp, '_blank');
}