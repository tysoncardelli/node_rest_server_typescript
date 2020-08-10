"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log("Clase inicializada");
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'node_db'
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            callback(null, results);
        });
    }
    conectarDB() {
        this.cnn.connect((error) => {
            if (error) {
                console.log(error.message);
                return;
            }
            this.conectado = true;
            console.log('Base de Datos Online');
        });
    }
}
exports.default = MySQL;
