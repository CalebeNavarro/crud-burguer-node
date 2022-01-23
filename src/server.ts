import "reflect-metadata";
import {createConnection} from "typeorm";
import app from "./app";

const PORT = 3000;


export const serverConnection = () => {
    createConnection().then( () => {

        console.log("Database connected!");
    
        app.listen(PORT, () => {
            console.log("Server running!");
        })
    
    }).catch(error => console.log(error));
}
