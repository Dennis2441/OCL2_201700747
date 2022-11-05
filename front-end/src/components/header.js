import React from "react";
import { Link } from "react-router-dom";

export function Header(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3" aria-label="Eighth navbar example">
            <div className="container">
                <Link className="navbar-brand" to="/">MFMScript</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07"
                    aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/editor">Editor</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" 
                                href="#" id="navbarDropdown" 
                                role="button" 
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false"> Reportes</span>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/errores">Errores</Link>
                                <Link className="dropdown-item" to="/ast">AST</Link>
                                <Link className="dropdown-item" to="/symtable">Tabla de Símbolos</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}