import React from "react";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useEffect, useState } from "react";
import { Header } from "../components/header";


export function Editor() {
    const [code, setCode] = useState("");
    const [data, setData] = useState();

    async function submitHandler(){
        const reqOps = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({entrada:code})
        };
        const response = await fetch('http://localhost:5000/analizar', reqOps);
        const data = await response.json().then( data => console.log(data));
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
                        backgroundColor: "rgb(33,37,41)",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                        height:"60vh"
                    }}
                ></CodeEditor>
                <textarea className="form-control mt-3" placeholder="Consola"></textarea>
            </div>
        </div>
    );
}