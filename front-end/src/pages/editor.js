import React from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useEffect, useState } from "react";
import { Header } from "../components/header";


export function Editor() {
    const [code, setCode] = useState("");
    const [consola, setConsola] = useState("");
    async function submitHandler(){
        const reqOps = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({entrada:code})
        };
        const response = await fetch('http://localhost:5000/analizar', reqOps);
        const data = await response.json().then( data => setConsola(data.consola));
    }

    return (
        <div>
            <Header></Header>
            <div className="container mt-3">
                <button className="btn btn-success mb-2" onClick={submitHandler}>
                    Ejecutar Código
                </button>
                <CodeEditor
                    value={code}
                    language="js"
                    placeholder="Ingresa Código MFM Script"
                    onChange={(evn) => setCode(evn.target.value)}
                    padding={15}
                    style={{
                        fontSize: 15,
                        backgroundColor: "white",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        height:"50vh"
                    }}
                ></CodeEditor>
                <textarea className="form-control mt-3" placeholder="Consola" value={consola}></textarea>
            </div>
        </div>
    );
}