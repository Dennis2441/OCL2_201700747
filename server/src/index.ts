import express from 'express';
import { Table } from './Simbols/Table';
import { Break } from './Expresiones/Break';
import { Continue } from './Expresiones/Continue';
import { Exception } from './utils/Exception';

const parser = require('./Grammar/Grammar.js');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());

app.use(express.urlencoded());
app.use(express.json());

app.post('/analizar', (req, res) => {
  const { entrada } = req.body;
  if (!entrada) {
    return res.redirect('/');
  }
  const tree = parser.parse(entrada);
  const tabla = new Table(null);

  
  tree.instructions.map((m: any) => {
    const res = m.execute(tabla, tree);
    if (res instanceof Break) {
      const error = new Exception('Semantico',
        `Sentencia break fuera de un ciclo`,
        res.line, res.column);
      tree.excepciones.push(error);
      tree.console.push(error.toString());
    } else if (res instanceof Continue) {
      const error = new Exception('Semantico',
        `Sentencia continue fuera de un ciclo`,
        res.line, res.column);
      tree.excepciones.push(error);
      tree.console.push(error.toString());
    }
  });
  
  let output = "";
  for(let i = 0; i < tree.console.length; i++){
    output += String(tree.console[i]);
  }
  console.log(output)
  let obj = {
    consola: output,
    errores: tree.excepciones
  };
  console.log(obj, tree.console);
  res.setHeader('Content-Type', 'application/json');
  res.json(obj);
});

app.listen(port, err => {
  return console.log(`server is listening on ${port}`);
});