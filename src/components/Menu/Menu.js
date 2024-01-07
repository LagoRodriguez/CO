import React, {useContext, useState} from 'react';
import "./Menu.css";
import {Link} from "react-router-dom";
import CalcularPantalla from "../../utils/CalcularPantalla";
import apiCategoria from "./apiCategoria";
import CarritoCompras from "./CarritoCompras";
import {EstadoContexto} from "../../context/EstadoGeneral";


export default function Menu() {
    const {usuario} = useContext(EstadoContexto);
    const existeUsuario = Object.keys(usuario).length;
    const {ancho} = CalcularPantalla();
    const [dataCategoria] = useState(apiCategoria);
    const [botonCarrito, setBotonCarrito] = useState(false)
    const [boton, setboton] = useState(false);
    const [estadoSubMenu, setEstadoSubMenu] = useState(false);
    const [tipoCategoria, setTipoCategoria] = useState({
        urlCategoria: 'Productos',
    });

  const activarSubCategoria = (e) => {
    setTipoCategoria({
        ...tipoCategoria,
        urlCategoria: e.target.dataset.categoria,
    });
    setEstadoSubMenu(!estadoSubMenu);
  };

  return (
  <>
    <nav className = "grid-menu-principal">
      <div
        className = "contenedor-menu-boton"
        onClick={() => setboton(!boton)}
      >
        <img
          src={boton ? "/icons/Cerrar.svg" : "/icons/Menu.svg"}
          alt="x"
          onClick={() => setboton(!boton)}
      />
      </div>
      <div
        className = {
          boton && ancho <= 1000
            ? "grid-menu-links grid-menu-links-activo"
            : "grid-menu-links"
        }
      >
        {ancho <=800 ?(
            <>

            <div className="menu-links">
              {dataCategoria.map((categoria) =>(
                  <div key={categoria.id}>
                  <div className ="menu-links-cabecera">
                      <Link
                          data-categoria={categoria.urlCategoria}
                          to="#"
                          onClick={activarSubCategoria}
                      >
                  {" "}
                  {categoria.nombreCategoria}
                          <img src="/icons/Abajo.svg" alt= ""/>
                  </Link>

                </div>

                    {estadoSubMenu && (
                        <div
                          className={
                            categoria.urlCategoria === tipoCategoria.urlCategoria
                              ? "menu-link-submenu menu-link-submenu-activo"
                              : "menu-link-submenu"
                          }
                    >
                    {categoria.subCategoria.map((item, index) => {
                        return (
                            <Link key={item.idSubCategoria} to="/tienda">
                                {item.nombreSubCategoria}
                            </Link>
                        );
                      })}{" "}
                    </div>
                  )}
                  </div>
                  ))}

                  <div className= "menu-links-iconos">
                      <Link to="/contacto">
                          Contacto </Link>
                      <Link to={existeUsuario ? "/cliente/perfil" : "/ingresar"}>
                          Cuenta
                      </Link>
                  </div>
               </div>
              </>
            ):(
            dataCategoria.map((categoria) => (
                <Link
                    key={categoria.id}
                    data-categoria={categoria.urlCategoria}
                    to="#"
                    onClick={activarSubCategoria}
                >
                    {" "}
                    {categoria.nombreCategoria}
                </Link>
                ))
              )}

              {ancho <= 800 && <> </>}
            </div>

            <div className="grid-menu-logo">
                <a href="/">CHOCOLAT</a> </div>

            <div className="grid-menu-iconos">
              {ancho <= 800 ? (
                  <>
                  <Link
                      to="#"
                      onClick={() => setBotonCarrito(!botonCarrito)}
                  >{/*{`Carrito(${2})`}*/}
                    <img src="/icons/Carrito.svg" alt=""/>
                    </Link>
                  </>
              ) : (
                  <>
                  <Link to="/contacto">
                      Contacto </Link>
                  <Link to={existeUsuario ? "/cliente/perfil" : "/ingresar"}>
                    Cuenta
                  </Link>
                    <Link
                        to="#"
                        onClick={() => setBotonCarrito(!botonCarrito)}
                    >{`Carrito(${2})`}
                    </Link>
                  </>
              )}
            </div>
          </nav>

          {estadoSubMenu &&
              dataCategoria.map((categoria, index) => (
                  <div
                    key={index}
                    data-categoria={categoria.urlCategoria}
                    className={
                      categoria.urlCategoria === tipoCategoria.urlCategoria
                        ? "grid-sub-menu grid-sub-menu-activo"
                        : "grid-sub-menu"
                    }
                  >

                  <div className="grid-contenedor-sub-menu-links">
                    {dataCategoria[index].subCategoria.map((subCategoria) => (
                        <div
                        className="grid-columna-sub-menu"
                        key={subCategoria.idSubCategoria}
                    >
                        <Link to={'/tienda'}> {subCategoria.nombreSubCategoria}</Link>
                        </div>
                    ))}
                  </div>

                  <div className="grid-contenedor-sub-menu-imagenes">
                    {categoria.galeriaImagenes.map((galeria, index) => (
                        <Link to="/tienda" key={index}>
                          <div className="grid-contenedor-producto">
                              {/*<img src={galeria.urlImagen} alt="" />*/}
                          </div>
                        </Link>
                        ))}
                    </div>
                  </div>
              ))}
      <CarritoCompras
          setBotonCarrito={setBotonCarrito}
          botonCarrito={botonCarrito}
      />
        </>
    );
  }
