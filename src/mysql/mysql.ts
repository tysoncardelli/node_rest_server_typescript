import mysql = require('mysql')

export default class MySQL {
        
        private static _instance: MySQL;

        cnn : mysql.Connection;
        conectado: boolean = false;
        
        constructor(){
            console.log("Clase inicializada"); 
            this.cnn = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'node_db'
            })
            this.conectarDB();
        }

        public static get instance(){

            return this._instance || (this._instance = new this());
        }

        public static ejecutarQuery(query:string, callback:Function){
            this.instance.cnn.query(query,(err,results,fields)=>{
                if(err){
                    console.log(err);
                    callback(err);
                    return;
                }
                if(results.length ===0){
                    callback('El registro solicitado no existe');
                }
                callback(null,results)
            })
        }
        private conectarDB(){
            this.cnn.connect((error:mysql.MysqlError)=>{
                if(error){
                    console.log(error.message)
                    return;
                }
                this.conectado = true;
                console.log('Base de Datos Online');
            })
        }
}