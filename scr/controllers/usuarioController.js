const db = require('../lib/database');

exports.getAllUsuarios = (req, res) => {
    db.query('SELECT * FROM tusuario', (err, results) => {
        if (err) {
            req.flash('error', 'Error al obtener los usuarios');
            return res.redirect('/');
        }
        res.render('links/usuarios', { usuarios: results });
    });
};

exports.updateUsuario = (req, res) => {
    const { idusuario, nombre, apellido, rol, username, password } = req.body;
    const query = 'UPDATE tusuario SET nombre = ?, apellido = ?, rol = ?, username = ?, password = ? WHERE idusuario = ?';

    db.query(query, [nombre, apellido, rol, username, password, idusuario], (err) => {
        if (err) {
            req.flash('error', 'Error al actualizar el usuario');
            return res.redirect('/usuarios');
        }
        req.flash('success', 'Usuario actualizado correctamente');
        return res.redirect('/usuarios');
    });
};

exports.addUsuario = (req, res) => {
    const { nombre, apellido, rol, username, password } = req.body;
    const query = 'INSERT INTO tusuario (nombre, apellido, rol, username, password) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [nombre, apellido, rol, username, password], (err) => {
        if (err) {
            req.flash('error', 'Error al agregar el usuario');
            return res.redirect('/usuarios');
        }
        req.flash('success', 'Usuario agregado correctamente');
        return res.redirect('/usuarios');
    });
};

exports.deleteUsuario = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tusuario WHERE idusuario = ?', [id], (err) => {
        if (err) {
            req.flash('error', 'Error al eliminar el usuario');
            return res.redirect('/usuarios');
        }
        req.flash('success', 'Usuario eliminado correctamente');
        return res.redirect('/usuarios');
    });
};
