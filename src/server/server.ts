import express = require('express');
import path = require('path');

export default class Server {

    public app: express.Application | undefined;
    public port: number | undefined;

    constructor(port: number){
        this.port = port;
        this.app = express();
        
    }

    static init(port:number){
        return new Server(port);
    }

    private publicFolder(){
        const publicPath = path.resolve(__dirname, '../public')
        //@ts-ignore
        this.app.use(express.static(publicPath))
        
    }

    start(callback: Function){
        //@ts-ignore
        this.app.listen(this.port, callback)
        this.publicFolder();
    }
}