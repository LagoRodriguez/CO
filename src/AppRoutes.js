import React from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router';
import { RutaPublica } from './routers';
import { LayoutGeneral } from './layout/conLayout';
import sinLayout from './layout/sinLayout/sinLayout';
import { Pagina404, GeneralInicio } from './pages';

const Routes = () => {
    return (
        <Switch>
            {/*RUTAS PUBLICAS*/}
            <RutaPublica
                component={GeneralInicio}
                exact
                layout={LayoutGeneral}
                path="/"
            />
            {/*RUTAS NO ENCONTRADAS*/}
            <RutaPublica
                component={Pagina404}
                exact
                layout={sinLayout}
                path="/pagina-no-encontrada"
            />
            <Redirect to="/pagina-no-encontrada"/>
        </Switch>

    );
};

export default Routes;
