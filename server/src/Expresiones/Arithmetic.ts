import { Node } from "../Abstract/Node";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Exception } from "../utils/Exception";
import { types, Type } from "../utils/Type";

/**
 * @class Genera un nuevo nodo expresion para realizar operaciones aritmeticas
 */
export class Arithmetic extends Node {
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
        // Envio null porque aun no se el tipo de la operación
        super(null, line, column);
        this.leftOperator = leftOperator;
        this.rightOperator = rightOperator;
        this.Operator = Operator;
    }

    execute(table: Table, tree: Tree) {
        if (this.rightOperator !== null) {
            const LeftResult = this.leftOperator.execute(table, tree);
            if (LeftResult instanceof Exception) {
                return LeftResult;
            }
            const RightResult = this.rightOperator.execute(table, tree);
            if (RightResult instanceof Exception) {
                return RightResult;
            }
    //------------------------------------------------------------------------------------------------------------------------
    //                                                      SUMA
    //------------------------------------------------------------------------------------------------------------------------
            if (this.Operator === '+') {
                //INT + INT
                if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.INT);
                    return LeftResult + RightResult;
                
                //DOUBLE + DOBLE
                } else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    return LeftResult + RightResult;

                //CHAR + CHAR
                } else if (this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.CHAR) {
                    this.type = new Type(types.STRING);
                    return String(LeftResult) + String(RightResult);
                
                //INT + BOOL || BOOL + INT
                } else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.BOOLEAN ||
                           this.leftOperator.type.type === types.BOOLEAN && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.INT);
                    return Number(LeftResult) + Number(RightResult);
                
                //DOUBLE + BOOL || BOOL + DOUBLE
                } else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.BOOLEAN ||
                            this.leftOperator.type.type === types.BOOLEAN && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    return Number(LeftResult) + Number(RightResult);            
                
                //INT + DOUBLE || DOUBLE + INT
                }else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.DOUBLE ||
                          this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.DOUBLE);
                    return LeftResult + RightResult;
                
                //INT + CHAR || CHAR + INT
                }else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.CHAR ||
                          this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.INT);
                    if(typeof LeftResult === 'string'){
                        return LeftResult.charCodeAt(0) + Number(RightResult);
                    }else{
                        return Number(LeftResult) + RightResult.charCodeAt(0);
                    }
                
                //DOUBLE + CHAR || CHAR + DOUBLE
                }else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.CHAR ||
                          this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    if(typeof LeftResult === 'string'){
                        return LeftResult.charCodeAt(0) + Number(RightResult);
                    }else{
                        return Number(LeftResult) + RightResult.charCodeAt(0);
                    }

                //ANY + STRING || STRING + ANY
                }else if (this.leftOperator.type.type === types.STRING || this.rightOperator.type.type === types.STRING) {
                        this.type = new Type(types.STRING);
                        return String(LeftResult) + String(RightResult);
                } else {
                    const error = new Exception('Semantico',
                        `Error de tipos en la suma se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }      
    //------------------------------------------------------------------------------------------------------------------------
    //                                                      RESTA
    //------------------------------------------------------------------------------------------------------------------------
            } else if (this.Operator === '-') {
                //INT - INT
                if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.INT);
                    return LeftResult - RightResult;
                
                //DOUBLE - DOBLE
                } else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    return LeftResult - RightResult;

                //CHAR + CHAR
                } else if (this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.CHAR) {
                    this.type = new Type(types.INT);
                    return LeftResult.charCodeAt(0) + RightResult.charCodeAt(0);

                //INT - DOUBLE || DOUBLE - INT
                }else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.DOUBLE ||
                          this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.DOUBLE);
                    return LeftResult - RightResult;

                //INT - BOOL || BOOL - INT
                } else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.BOOLEAN ||
                           this.leftOperator.type.type === types.BOOLEAN && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.INT);
                    return Number(LeftResult) - Number(RightResult);
                
                //DOUBLE - BOOL || BOOL - DOUBLE
                } else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.BOOLEAN ||
                            this.leftOperator.type.type === types.BOOLEAN && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    return Number(LeftResult) - Number(RightResult);

                 //INT - CHAR || CHAR - INT
                }else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.CHAR ||
                    this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.INT);
                    if(typeof LeftResult === 'string'){
                        return LeftResult.charCodeAt(0) - Number(RightResult);
                    }else{
                        return Number(LeftResult) - RightResult.charCodeAt(0);
                    }
                
                //DOUBLE - CHAR || CHAR - DOUBLE
                }else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.CHAR ||
                            this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    if(typeof LeftResult === 'string'){
                        return LeftResult.charCodeAt(0) - Number(RightResult);
                    }else{
                        return Number(LeftResult) - RightResult.charCodeAt(0);
                    }
                } else {
                    console.log(this.leftOperator)
                    const error = new Exception('Semantico',
                        `Error de tipos en la resta se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
        //------------------------------------------------------------------------------------------------------------------------
        //                                                 MULTIPLICACION
        //------------------------------------------------------------------------------------------------------------------------
            } else if (this.Operator === '*') {
                //INT * INT
                if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.INT);
                    return LeftResult * RightResult;
                
                //DOUBLE * DOBLE
                } else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    return LeftResult * RightResult;

                //CHAR * CHAR
                } else if (this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.CHAR) {
                    this.type = new Type(types.INT);
                    return LeftResult.charCodeAt(0) * RightResult.charCodeAt(0);

                //INT * DOUBLE || DOUBLE * INT
                }else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.DOUBLE ||
                          this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.DOUBLE);
                    return LeftResult * RightResult;

                //INT * BOOL || BOOL * INT
                } else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.BOOLEAN ||
                           this.leftOperator.type.type === types.BOOLEAN && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.INT);
                    return Number(LeftResult) * Number(RightResult);
                
                //DOUBLE * BOOL || BOOL * DOUBLE
                } else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.BOOLEAN ||
                            this.leftOperator.type.type === types.BOOLEAN && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    return Number(LeftResult) * Number(RightResult);

                 //INT * CHAR || CHAR * INT
                }else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.CHAR ||
                    this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.INT);
                    if(typeof LeftResult === 'string'){
                        return LeftResult.charCodeAt(0) - Number(RightResult);
                    }else{
                        return Number(LeftResult) * RightResult.charCodeAt(0);
                    }
                
                //DOUBLE * CHAR || CHAR * DOUBLE
                }else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.CHAR ||
                            this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    if(typeof LeftResult === 'string'){
                        return LeftResult.charCodeAt(0) - Number(RightResult);
                    }else{
                        return Number(LeftResult) * RightResult.charCodeAt(0);
                    }
                } else {
                    console.log(this.leftOperator)
                    const error = new Exception('Semantico',
                        `Error de tipos en la resta se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
        //------------------------------------------------------------------------------------------------------------------------
        //                                                 DIVISION
        //------------------------------------------------------------------------------------------------------------------------
            } else if (this.Operator === '/') {
                //INT / INT
                if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.DOUBLE);
                    if (RightResult === 0) {
                        const error = new Exception('Semantico',
                            `Error aritmetico, La division con cero no esta permitida`,
                            this.line, this.column);
                        tree.excepciones.push(error);
                        tree.console.push(error.toString());
                        return error;
                    }
                    return LeftResult / RightResult;
                
                //DOUBLE / DOBLE
                } else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    if (RightResult === 0) {
                        const error = new Exception('Semantico',
                            `Error aritmetico, La division con cero no esta permitida`,
                            this.line, this.column);
                        tree.excepciones.push(error);
                        tree.console.push(error.toString());
                        return error;
                    }
                    return LeftResult / RightResult;

                //CHAR / CHAR
                } else if (this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.CHAR) {
                    this.type = new Type(types.DOUBLE);
                    if (RightResult.charCodeAt(0) === 0) {
                        const error = new Exception('Semantico',
                            `Error aritmetico, La division con cero no esta permitida`,
                            this.line, this.column);
                        tree.excepciones.push(error);
                        tree.console.push(error.toString());
                        return error;
                    }
                    return LeftResult.charCodeAt(0) / RightResult.charCodeAt(0);

                //INT / DOUBLE || DOUBLE / INT
                }else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.DOUBLE ||
                          this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.DOUBLE);
                    if (RightResult === 0) {
                        const error = new Exception('Semantico',
                            `Error aritmetico, La division con cero no esta permitida`,
                            this.line, this.column);
                        tree.excepciones.push(error);
                        tree.console.push(error.toString());
                        return error;
                    }
                    return LeftResult * RightResult;

                //INT / BOOL || BOOL / INT
                } else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.BOOLEAN ||
                           this.leftOperator.type.type === types.BOOLEAN && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.DOUBLE);
                    if (Number(RightResult) === 0) {
                        const error = new Exception('Semantico',
                            `Error aritmetico, La division con cero no esta permitida`,
                            this.line, this.column);
                        tree.excepciones.push(error);
                        tree.console.push(error.toString());
                        return error;
                    }
                    return Number(LeftResult) / Number(RightResult);
                
                //DOUBLE / BOOL || BOOL / DOUBLE
                } else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.BOOLEAN ||
                            this.leftOperator.type.type === types.BOOLEAN && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    if (Number(RightResult) === 0) {
                        const error = new Exception('Semantico',
                            `Error aritmetico, La division con cero no esta permitida`,
                            this.line, this.column);
                        tree.excepciones.push(error);
                        tree.console.push(error.toString());
                        return error;
                    }
                    return Number(LeftResult) / Number(RightResult);

                 //INT / CHAR || CHAR / INT
                }else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.CHAR ||
                    this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.DOUBLE);
                    if(typeof LeftResult === 'string'){
                        if (RightResult === 0) {
                            const error = new Exception('Semantico',
                                `Error aritmetico, La division con cero no esta permitida`,
                                this.line, this.column);
                            tree.excepciones.push(error);
                            tree.console.push(error.toString());
                            return error;
                        }
                        return LeftResult.charCodeAt(0) / Number(RightResult);
                    }else{
                        if (RightResult.charCodeAt(0) === 0) {
                            const error = new Exception('Semantico',
                                `Error aritmetico, La division con cero no esta permitida`,
                                this.line, this.column);
                            tree.excepciones.push(error);
                            tree.console.push(error.toString());
                            return error;
                        }
                        return Number(LeftResult) / RightResult.charCodeAt(0);
                    }
                
                //DOUBLE / CHAR || CHAR / DOUBLE
                }else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.CHAR ||
                            this.leftOperator.type.type === types.CHAR && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    if(typeof LeftResult === 'string'){
                        if (RightResult === 0) {
                            const error = new Exception('Semantico',
                                `Error aritmetico, La division con cero no esta permitida`,
                                this.line, this.column);
                            tree.excepciones.push(error);
                            tree.console.push(error.toString());
                            return error;
                        }
                        return LeftResult.charCodeAt(0) / Number(RightResult);
                    }else{
                        if (RightResult.charCodeAt(0) === 0) {
                            const error = new Exception('Semantico',
                                `Error aritmetico, La division con cero no esta permitida`,
                                this.line, this.column);
                            tree.excepciones.push(error);
                            tree.console.push(error.toString());
                            return error;
                        }
                        return Number(LeftResult) / RightResult.charCodeAt(0);
                    }
                } else {
                    console.log(this.leftOperator)
                    const error = new Exception('Semantico',
                        `Error de tipos en la resta se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }
        //------------------------------------------------------------------------------------------------------------------------
        //                                                 POTENCIA
        //------------------------------------------------------------------------------------------------------------------------
            } else if (this.Operator === '^') {
                //INT ^ INT
                if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.INT);
                    return Math.pow(LeftResult, RightResult);
                
                //DOUBLE ^ DOBLE
                } else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    return Math.pow(LeftResult, RightResult);

                //INT ^ DOUBLE || DOUBLE ^ INT
                }else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.DOUBLE ||
                          this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.DOUBLE);
                    return Math.pow(LeftResult, RightResult);

                //INT ^ BOOL || BOOL ^ INT
                } else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.BOOLEAN ||
                            this.leftOperator.type.type === types.BOOLEAN && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.INT);
                    return Math.pow(Number(LeftResult), Number(RightResult));
                
                //DOUBLE ^ BOOL || BOOL ^ DOUBLE
                } else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.BOOLEAN ||
                            this.leftOperator.type.type === types.BOOLEAN && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    return Math.pow(Number(LeftResult), Number(RightResult));
                } else {
                    console.log(this.leftOperator)
                    const error = new Exception('Semantico',
                        `Error de tipos en la resta se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    tree.console.push(error.toString());
                    return error;
                }

        //------------------------------------------------------------------------------------------------------------------------
        //                                                 MODULO
        //------------------------------------------------------------------------------------------------------------------------
            } else if (this.Operator === '%') {
                //INT % INT
                if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.DOUBLE);
                    return LeftResult % RightResult;
                
                //DOUBLE % DOBLE
                } else if (this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    return LeftResult % RightResult;

                //INT % DOUBLE || DOUBLE % INT
                }else if (this.leftOperator.type.type === types.INT && this.rightOperator.type.type === types.DOUBLE ||
                          this.leftOperator.type.type === types.DOUBLE && this.rightOperator.type.type === types.INT) {
                    this.type = new Type(types.DOUBLE);
                    return LeftResult % RightResult;

                } else {
                    console.log(this.leftOperator)
                    const error = new Exception('Semantico',
                        `Error de tipos en la resta se esta tratando de operar ${this.leftOperator.type.type} y ${this.rightOperator.type.type}`,
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

        } else {
            const LeftResult = this.leftOperator.execute(table, tree);
            if (LeftResult instanceof Exception) {
                return LeftResult;
            }
            if (this.Operator === '-') {
                if (this.leftOperator.type.type === types.INT) {
                    this.type = new Type(types.INT);
                    return -1*LeftResult;
                } else if (this.leftOperator.type.type === types.DOUBLE) {
                    this.type = new Type(types.DOUBLE);
                    return -1*LeftResult;
                } else {
                    const error = new Exception('Semantico',
                        `Error de tipos en el operador unario se esta tratando de operar ${this.leftOperator.type.type}`,
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
}