import React from 'react';
import Menu from '../../components/Menu/Menu';
import Promocion from '../../components/Promocion/Promocion';
import {Outlet} from "react-router-dom";
import Pie from "../../components/Pie/Pie";

const LayoutGeneral = (props) => {
    const {children} = props;
    return (
        <>
        <Menu/>
            <section style={{marginTop: "80px"}}>
                <Promocion />
               <div>{children}</div>
            </section> {""}
        </>
    );
};

export default LayoutGeneral;