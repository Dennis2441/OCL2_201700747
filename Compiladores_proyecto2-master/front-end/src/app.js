import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from "./pages/home";
import { Editor } from "./pages/editor";

export function App(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Home/> } />
                    <Route path='/editor' element={ <Editor/> } />
                </Routes>
            </BrowserRouter>
        </div>
    )
}