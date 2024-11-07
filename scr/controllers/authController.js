const connection = require('../lib/database');

exports.authenticate = async (req, res) => {
    const username = req.body.username; 
    const password = req.body.password; 

    if (username && password) {
        connection.query('SELECT * FROM tusuario WHERE username = ?', [username], (error, results) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                req.flash('alert', true);
                req.flash('alertTitle', "Error");
                req.flash('alertMessage', "Hubo un problema al procesar la solicitud.");
                req.flash('alertIcon', 'error');
                return res.redirect('/login');
            }

            if (results.length === 0) {
                req.flash('alert', true);
                req.flash('alertTitle', "Error");
                req.flash('alertMessage', "USUARIO y/o PASSWORD incorrectas");
                req.flash('alertIcon', 'error');
                req.flash('showConfirmButton', true);
                req.flash('timer', false);
                req.flash('ruta', 'login');
                return res.redirect('/login');
            } 
            
            if (password !== results[0].password) {
                req.flash('alert', true);
                req.flash('alertTitle', "Error");
                req.flash('alertMessage', "USUARIO y/o PASSWORD incorrectas");
                req.flash('alertIcon', 'error');
                req.flash('showConfirmButton', true);
                req.flash('timer', false);
                req.flash('ruta', 'login');
                return res.redirect('/login');
            }

            req.session.loggedin = true;
            req.session.nombre = results[0].nombre;
            req.flash('alert', true);
            req.flash('alertTitle', "Conexión exitosa");
            req.flash('alertMessage', "¡LOGIN CORRECTO!");
            req.flash('alertIcon', 'success');
            req.flash('showConfirmButton', false);
            req.flash('timer', 1500);
            req.flash('ruta', '');
            return res.redirect('/dashboard'); // Redirige a la página principal
        });
    } else {
        req.flash('alert', true);
        req.flash('alertTitle', "Error");
        req.flash('alertMessage', "Por favor, ingresa usuario y contraseña.");
        req.flash('alertIcon', 'error');
        return res.redirect('/login');
    }
};

exports.logout = (req, res) => {
    req.session.loggedin = false;

    req.flash('alert', true);
    req.flash('alertTitle', "Sesión cerrada");
    req.flash('alertMessage', "¡Has cerrado sesión correctamente!");
    req.flash('alertIcon', 'success');
    res.redirect('/login'); 
};
