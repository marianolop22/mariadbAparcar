//punto de entrada a la aplicacion
//requires
var express = require('express');
var bodyParser = require('body-parser');
const mariadb = require('mariadb');
var POOL = require('./config/config').POOL;

//inicializar variables
var app = express();



//importar rutas

var appRoutes = require('./routes/app.routes');
var provinceRoutes = require('./routes/province.routes');
// var loginRoutes = require('./routes/login.routes');
// var hospitalRoutes = require('./routes/hospital.routes');
// var medicoRoutes = require('./routes/medico.routes');
// var busquedaRoutes = require('./routes/busqueda.routes');
// var uploadRoutes = require('./routes/upload.routes');
// var imagenesRoutes = require('./routes/imagenes.routes');

//conecxion a la base
const pool = mariadb.createPool(POOL);

async function asyncFunction() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log("connected ! connection id is " + conn.threadId);
        //const rows = await conn.query("SELECT 1 as val");
        //console.log(rows); //[ {val: 1}, meta: ... ]
        //const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
        //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (conn) return conn.end(); //release to pool
    }
}


//server index config, esto es para mostrar las carpetas
// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));

//bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rutas
app.use('/province', provinceRoutes);
// app.use('/login', loginRoutes);
// app.use('/hospital', hospitalRoutes);
// app.use('/medico', medicoRoutes);
// app.use('/busqueda', busquedaRoutes);
// app.use('/upload', uploadRoutes);
// app.use('/img', imagenesRoutes);
app.use('/', appRoutes);


//escuchar peticiones
app.listen(3000, () => {
    asyncFunction().then(resolve => {

    })
    console.log('Express Server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', ' online')
})