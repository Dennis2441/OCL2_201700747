import { Node } from "../Abstract/Node";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";

/**
 * @class Genera un nuevo nodo expresion para realizar operaciones relacionales
 */
export class Relational extends Node {
    leftOperator: Node;
    rightOperator: Node;
    Operator: String;

    /**
     * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
     * @param leftOperator Nodo expresion izquierdo
     * @param rightOperator Nodo expresion derecho
     * @param Operator Operador
     * @param line linea de la operacion
     * @param column columna de la operacion
     */
    constructor(leftOperator: Node, rightOperator: Node, Operator: String, line: Number, column: Number) {
        super(new Type(types.BOOLEAN), line, column);
        this.leftOperator = leftOperator;
        this.rightOperator = rightOperator;
        this.Operator = Operator;
    }

    execute(table: Table, tree: Tree) {
        const LeftResult = this.leftOperator.execute(table, tree);
        if (LeftResult instanceof Exception) {
            return LeftResult;
        }
        const RightResult = this.rightOperator.execute(table, tree);
        if (RightResult instanceof Exception) {
            return RightResult;
        }

        if (this.Operator === '<') {
            //CHAR < CHAR
            if (this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.CHAR) {
                this.type = new Type(types.BOOLEAN);
                return LeftResult.charCodeAt(0) < RightResult.charCodeAt(0);
            //INT < CHAR || CHAR < INT 
            }else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.CHAR ||
                      this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.INT) {
                this.type = new Type(types.BOOLEAN);
                if(typeof LeftResult === 'string'){
                    return LeftResult.charCodeAt(0) < Number(RightResult);
                }else{
                    return Number(LeftResult) < RightResult.charCodeAt(0);
                }
            //DOUBLE < CHAR || CHAR < DOUBLE 
            }else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.CHAR ||
                      this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.DOUBLE) {
                this.type = new Type(types.BOOLEAN);
                if(typeof LeftResult === 'string'){
                    return LeftResult.charCodeAt(0) < Number(RightResult);
                }else{
                    return Number(LeftResult) < RightResult.charCodeAt(0);
                }
            //INT < CHAR || CHAR < INT 
            }else if ((this.leftOperator.type.type === types.INT || this.rightOperator.type.type === types.DOUBLE) &&
                      (this.leftOperator.type.type === types.DOUBLE || this.rightOperator.type.type === types.DOUBLE)) {
                this.type = new Type(types.BOOLEAN);
                return LeftResult < RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en MENOR QUE se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '>') {
            //CHAR < CHAR
            if (this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.CHAR) {
                this.type = new Type(types.BOOLEAN);
                return LeftResult.charCodeAt(0) > RightResult.charCodeAt(0);
            //INT < CHAR || CHAR < INT 
            }else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.CHAR ||
                      this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.INT) {
                this.type = new Type(types.BOOLEAN);
                if(typeof LeftResult === 'string'){
                    return LeftResult.charCodeAt(0) > Number(RightResult);
                }else{
                    return Number(LeftResult) > RightResult.charCodeAt(0);
                }
            //DOUBLE < CHAR || CHAR < DOUBLE 
            }else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.CHAR ||
                      this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.DOUBLE) {
                this.type = new Type(types.BOOLEAN);
                if(typeof LeftResult === 'string'){
                    return LeftResult.charCodeAt(0) > Number(RightResult);
                }else{
                    return Number(LeftResult) > RightResult.charCodeAt(0);
                }
            //INT < CHAR || CHAR < INT 
            }else if ((this.leftOperator.type.type === types.INT || this.rightOperator.type.type === types.DOUBLE) &&
                      (this.leftOperator.type.type === types.DOUBLE || this.rightOperator.type.type === types.DOUBLE)) {
                this.type = new Type(types.BOOLEAN);
                return LeftResult > RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en MENOR QUE se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '>=') {
            //CHAR < CHAR
            if (this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.CHAR) {
                this.type = new Type(types.BOOLEAN);
                return LeftResult.charCodeAt(0) >= RightResult.charCodeAt(0);
            //INT < CHAR || CHAR < INT 
            }else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.CHAR ||
                      this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.INT) {
                this.type = new Type(types.BOOLEAN);
                if(typeof LeftResult === 'string'){
                    return LeftResult.charCodeAt(0) >= Number(RightResult);
                }else{
                    return Number(LeftResult) >= RightResult.charCodeAt(0);
                }
            //DOUBLE < CHAR || CHAR < DOUBLE 
            }else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.CHAR ||
                      this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.DOUBLE) {
                this.type = new Type(types.BOOLEAN);
                if(typeof LeftResult === 'string'){
                    return LeftResult.charCodeAt(0) >= Number(RightResult);
                }else{
                    return Number(LeftResult) >= RightResult.charCodeAt(0);
                }
            //INT < CHAR || CHAR < INT 
            }else if ((this.leftOperator.type.type === types.INT || this.rightOperator.type.type === types.DOUBLE) &&
                      (this.leftOperator.type.type === types.DOUBLE || this.rightOperator.type.type === types.DOUBLE)) {
                this.type = new Type(types.BOOLEAN);
                return LeftResult >= RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en MENOR QUE se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '<=') {
            //CHAR < CHAR
            if (this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.CHAR) {
                this.type = new Type(types.BOOLEAN);
                return LeftResult.charCodeAt(0) <= RightResult.charCodeAt(0);
            //INT < CHAR || CHAR < INT 
            }else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.CHAR ||
                      this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.INT) {
                this.type = new Type(types.BOOLEAN);
                if(typeof LeftResult === 'string'){
                    return LeftResult.charCodeAt(0) <= Number(RightResult);
                }else{
                    return Number(LeftResult) <= RightResult.charCodeAt(0);
                }
            //DOUBLE < CHAR || CHAR < DOUBLE 
            }else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.CHAR ||
                      this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.DOUBLE) {
                this.type = new Type(types.BOOLEAN);
                if(typeof LeftResult === 'string'){
                    return LeftResult.charCodeAt(0) <= Number(RightResult);
                }else{
                    return Number(LeftResult) <= RightResult.charCodeAt(0);
                }
            //INT < CHAR || CHAR < INT 
            }else if ((this.leftOperator.type.type === types.INT || this.rightOperator.type.type === types.DOUBLE) &&
                      (this.leftOperator.type.type === types.DOUBLE || this.rightOperator.type.type === types.DOUBLE)) {
                this.type = new Type(types.BOOLEAN);
                return LeftResult <= RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en MENOR QUE se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '!=') {
            if ((this.leftOperator.type.type === types.INT || this.rightOperator.type.type === types.DOUBLE) &&
                (this.leftOperator.type.type === types.DOUBLE || this.rightOperator.type.type === types.DOUBLE)) {
                return LeftResult !== RightResult;
            }if (this.leftOperator.type.type === types.BOOLEAN && this.rightOperator.type.type === types.BOOLEAN) {
                    this.type = new Type(types.BOOLEAN);
                    return LeftResult !== RightResult;
            } else if ((this.leftOperator.type.type === types.CHAR || this.rightOperator.type.type === types.STRING) &&
                        (this.leftOperator.type.type === types.CHAR || this.rightOperator.type.type === types.STRING)) {
                return LeftResult !== RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en DIFERENTE QUE se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else if (this.Operator === '==') {
            if ((this.leftOperator.type.type === types.INT || this.rightOperator.type.type === types.DOUBLE) &&
                (this.leftOperator.type.type === types.DOUBLE || this.rightOperator.type.type === types.DOUBLE)) {
                return LeftResult === RightResult;
            }if (this.leftOperator.type.type === types.BOOLEAN && this.rightOperator.type.type === types.BOOLEAN) {
                    this.type = new Type(types.BOOLEAN);
                    return LeftResult === RightResult;
            } else if ((this.leftOperator.type.type === types.CHAR || this.rightOperator.type.type === types.STRING) &&
                        (this.leftOperator.type.type === types.CHAR || this.rightOperator.type.type === types.STRING)) {
                return LeftResult === RightResult;
            } else {
                const error = new Exception('Semantico',
                    `Error de tipos en DIFERENTE QUE se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.console.push(error.toString());
                return error;
            }
        } else {
            const error = new Exception('Semantico',
                `Error, Operador desconocido`,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.console.push(error.toString());
            return error;
        }
    }
}