import Dexie from "dexie";

export const db2 = new Dexie("ReactDexie");

db2.version(2).stores({
    productosIDB: "IdProducto, Nombre, Marca, UrlProducto, Descripcion, Precio, Cantidad, TiempoEntrega, ImagenUrl, Unidad",
});

db2.open().catch((err) => {
    console.error(err.stack || err);
});

export const productosTraerIDB = async () => {
    const productosIDBCarrito = await db2.productosIDB.toArray();
    return productosIDBCarrito;
};

export const productoCrearIDB = (productoIDB) => {
    db2.productosIDB.add(productoIDB);
}

export const productoEliminarIDB = (productoIDB) => {
    db2.productosIDB.delete(productoIDB);
}

export const productoAumentarUnidadIDB = (productoIDB, formUnidad) => {
    db2.productosIDB.update(productoIDB, {
        Unidad: formUnidad + 1,
    });
};

export const productoDisminuirUnidadIDB = (productoIDB, formUnidad) => {
    db2.productosIDB.update(productoIDB, {
        Unidad: formUnidad - 1,
    });
};

export const eliminarCarritoIDB = () => {
    db2.productosIDB.clear()
};

