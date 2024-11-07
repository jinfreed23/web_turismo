const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars'); 
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');

const { database } = require('./keys');

// Inicialización
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 8085);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({ 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());


app.use(session({ 
    secret: 'tu_secreto', 
    resave: true, 
    saveUninitialized: true 
}));

// Middleware
app.use(flash());

app.use((req, res, next) => {
    res.locals.session = req.session; 
    res.locals.loggedin = req.session.loggedin || false; 
    next();
});

// Rutas
app.use(require('./routes'));          
app.use('/', require('./routes/links')); 
app.use('/', require('./routes/auth')); 
app.use('/', require('./routes/clientes'));
app.use('/', require('./routes/proveedores'));
app.use('/', require('./routes/usuarios'));
app.use('/', require('./routes/services'));
app.use('/', require('./routes/pagos'));
app.use('/', require('./routes/paqueteturistico'));
app.use('/', require('./routes/reserva'));


// Public
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});




