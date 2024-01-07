import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RutaPublica = (props) => {
    const { layout: Layout, component: Component, path, ...rest } = props;
    return (
        <Route
            {...rest}
            path={path}
            render={(matchProps) => <Layout> {<Component {...matchProps}/>}</Layout>}
        />
    );
};

RutaPublica.propTypes = {
    component: PropTypes.elementType.isRequired,
    layout: PropTypes.elementType.isRequired,
    path: PropTypes.string,
};

export default RutaPublica;
