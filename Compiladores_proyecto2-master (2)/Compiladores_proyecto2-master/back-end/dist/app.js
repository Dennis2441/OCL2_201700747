"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
// import * as controller from './controller';
//Creamos una nueva instancia para nuestra aplicacion
const app = express();
//configuraciones
app.set('port', 5000);
//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//rutas
app.get('/', (req, res) => {
    console.log(req);
    res.send(`Compiladores 1 - Sección B, http://localhost:${app.get('port')}`);
});
// app.get('/analisis', controller.analizar);
// app.post('/miAuxiliar', controller.miAuxiliar);
app.listen(app.get('port'));
console.log('Server in port: ', app.get('port'));
//# sourceMappingURL=app.js.map