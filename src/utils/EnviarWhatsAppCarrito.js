export default function EnviarWhatsAppCarrito(products, total) {
    const numeroTelefono = "691626728";
    let saltoLinea = "%0D%0A";
    var descrpcionProductos = products.map(function (des) {
        return (
            "-" +
            des.Unidad +
            " unidad(es) de" +
            des.Nombre +
            " a S/." +
            des.Precio +
            ".00" +
            saltoLinea
        );
    });
    const textoMensaje = `Hola Chocolat, estoy intentando comprar:${saltoLinea} ${saltoLinea}${descrpcionProductos.join(
        ""
    )} ${saltoLinea}Necesito ayuda para pagar S/. ${total}.00`;
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=34${numeroTelefono}&text=${encodeURIComponent(textoMensaje)}`;
    window.open(urlWhatsApp, '_blank');
}