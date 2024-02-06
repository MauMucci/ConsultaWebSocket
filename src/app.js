import express from 'express'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import { Server } from 'socket.io'
import path from 'path'

const app = express()
const PORT = 8080

const httpServer = app.listen(PORT,() => console.log(`Servidor escuchando desde puerto ${PORT}`));

const socketServer = new Server(httpServer)

// Configuracion el motor de plantillas Handlebars
app.engine('handlebars',handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','handlebars')


// Configura Express para servir archivos estáticos desde el directorio 'public'
app.use(express.static(__dirname +'/public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',viewsRouter)



socketServer.on("connection", (socket) => {
    console.log("Nuevo cliente conectado APP.JS");

    socket.on("message", (data) => {
        console.log("Mensaje recibido:", data);
    });

});
