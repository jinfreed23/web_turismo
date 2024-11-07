const db = require('../lib/database');

exports.getAllClientes = (req, res) => {
    db.query('SELECT * FROM tcliente', (err, results) => {
        if (err) {
            req.flash('error', 'Error al obtener los clientes');
            return res.redirect('/');
        }
        res.render('links/clientes', { client: results });
    });
};

exports.updateCliente = (req, res) => {
    const { idCliente, nombres, apellidos, nacionalidad, fechaNacimiento, telefono, correo } = req.body;
    const query = 'UPDATE tcliente SET nombres = ?, apellidos = ?, nacionalidad = ?, fechaNacimiento = ?, telefono = ?, correo = ? WHERE idcliente = ?';

    db.query(query, [nombres, apellidos, nacionalidad, fechaNacimiento, telefono, correo, idCliente], (err) => {
        if (err) {
            req.flash('error', 'Error al actualizar el cliente');
            return res.redirect('/clientes');
        }
        req.flash('success', 'Cliente actualizado correctamente');
        return res.redirect('/clientes');
    });
};

exports.addCliente = (req, res) => {
    const { nombres, apellidos, nacionalidad, fechaNacimiento, telefono, correo } = req.body;
    const query = 'INSERT INTO tcliente (nombres, apellidos, nacionalidad, fechaNacimiento, telefono, correo) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [nombres, apellidos, nacionalidad, fechaNacimiento, telefono, correo], (err) => {
        if (err) {
            req.flash('error', 'Error al agregar el cliente');
            return res.redirect('/clientes');
        }
        req.flash('success', 'Cliente agregado correctamente');
        return res.redirect('/clientes');
    });
};

exports.deleteCliente = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tcliente WHERE idcliente = ?', [id], (err) => {
        if (err) {
            req.flash('error', 'Error al eliminar el cliente');
            return res.redirect('/clientes');
        }
        req.flash('success', 'Cliente eliminado correctamente');
        return res.redirect('/clientes');
    });
};
