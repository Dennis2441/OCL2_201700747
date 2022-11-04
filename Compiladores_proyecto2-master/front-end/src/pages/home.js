import React from "react";

import { Header } from "../components/header";

export function Home(){
    return (
        <div className="text-center text-white" style={{height:"100vh"}}>
            <Header />
            <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" >
                <div className="" style={{marginTop:"14vh"}}>
                    <h1>Proyecto 2</h1>
                    <h4>Organización de Lenguajes y Compiladores 1</h4>
                    <p className="lead">
                    Esta aplicación está permite compartir publicaciones a los usuarios registrados. 
                    Tiene las funcionalidades de login, registro de usuarios, ver
                    publicaciones, crear publicaciones, chatear con amigos y bots para obtener información sobre la
                    facultad de ingenieria, así como la traducción de publicaciones.
                    </p>
                    <p className="lead">
                        <a href="/" className="btn btn-lg btn-secondary fw-bold border-white bg-white">Enlace Repositorio</a>
                    </p>
                </div>
            </div>
        </div>
    );
}