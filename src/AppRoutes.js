import {Route, Routes, Navigate, Router, BrowserRouter} from 'react-router-dom';
import {RutaPublica} from "./routers";
import {
    LayoutGeneral,
    LayoutCliente,
    LayoutAdministracion,
} from "./layout/conLayout";
import SinLayout from "./layout/sinLayout/sinLayout";

import {
    Pagina404,
    GeneralInicio,
    GeneralProdutoSolo,
    GeneralIngresar,
    GeneralRegistrar,
    GeneralVerificar,
    GeneralRecuperar,
    ClientePerfil,
    ClienteGuardados,
    ClienteDireccion,
    AdministracionReportes,
    AdministracionCategorias,
    AdministracionEtiquetas,
    AdministracionProductos,
    GeneralInicioManifiesto,
    GeneralContacto,
    GeneralAvisoLegal,
    GeneralPrivacidad
} from "./pages";


const AppRoutes = () => {
    return (

            <Routes>
                {/* RUTAS PÚBLICAS */}
                <Route path="/" element={<GeneralInicio/>}/>
                <Route path="/manifiesto" element={<GeneralInicioManifiesto/>}/>
                <Route path="/contacto" element={<GeneralContacto/>}/>
                <Route path="/avisoLegal" element={<GeneralAvisoLegal/>}/>
                <Route path="/privacidad" element={<GeneralPrivacidad/>}/>
                <Route path="/ingresar" element={<GeneralIngresar/>}/>
                <Route path="/registrar" element={<GeneralRegistrar/>}/>
                <Route path="/verificar" element={<GeneralVerificar/>}/>
                <Route path="/recuperar" element={<GeneralRecuperar/>}/>

                {/* CLIENTE */}
                <Route path="/cliente/perfil" element={<ClientePerfil/>}/>
            {/*    <Route*/}
            {/*        path="/cliente/guardados"*/}
            {/*        element={<RutaPublica component={ClienteGuardados} layout={LayoutCliente} />}*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*        path="/cliente/direccion"*/}
            {/*        element={<RutaPublica component={ClienteDireccion} layout={LayoutCliente} />}*/}
            {/*    />*/}

                {/*ADMINISTRACION*/}
                <Route path="/administracion/reportes" element={<AdministracionReportes/>}/>
                />
                <Route path="/administracion/categorias" element={<AdministracionCategorias/>}/>
                />
                <Route path="/administracion/productos" element={<AdministracionProductos/>}/>
                />
                {/*<Route*/}
                {/*    path="/administracion/etiquetas"*/}
                {/*    element={<RutaPublica component={AdministracionEtiquetas} layout={LayoutAdministracion} />}*/}
                {/*/>*/}

            {/*     NO ENCONTRADAS*/}
            {/*    <Route*/}
            {/*        path="/pagina-no-encontrada"*/}
            {/*        element={<RutaPublica component={Pagina404} layout={SinLayout()} />}*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*        path="*"*/}
            {/*        element={<Navigate to="/pagina-no-encontrada" />}*/}
            {/*    />*/}


                {/*                <Route*/}
                {/*        path="/producto/:producto/:id"*/}
                {/*        element={<RutaPublica component={GeneralProductoSolo} layout={LayoutGeneral} />}*/}
                {/*    />*/}


            </Routes>


    );
};
export default AppRoutes;
