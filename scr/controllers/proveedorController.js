const db = require('../lib/database');

exports.getAllProveedores = (req, res) => {
    db.query('SELECT * FROM tproveedores', (err, results) => {
        if (err) {
            req.flash('error', 'Error al obtener los proveedores');
            return res.redirect('/');
        }
        res.render('links/proveedores', { proveedores: results });
    });
};

exports.updateProveedor = (req, res) => {
    const { idproveedor, ruc, razon_social, direccion, correo, telefono } = req.body;
    const query = 'UPDATE tproveedores SET ruc = ?, razon_social = ?, direccion = ?, correo = ?, telefono = ? WHERE idproveedor = ?';

    db.query(query, [ruc, razon_social, direccion, correo, telefono, idproveedor], (err) => {
        if (err) {
            req.flash('error', 'Error al actualizar el proveedor');
            return res.redirect('/proveedores');
        }
        req.flash('success', 'Proveedor actualizado correctamente');
        return res.redirect('/proveedores');
    });
};

exports.addProveedor = (req, res) => {
    const { ruc, razon_social, direccion, correo, telefono } = req.body;
    const query = 'INSERT INTO tproveedores (ruc, razon_social, direccion, correo, telefono) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [ruc, razon_social, direccion, correo, telefono], (err) => {
        if (err) {
            req.flash('error', 'Error al agregar el proveedor');
            return res.redirect('/proveedores');
        }
        req.flash('success', 'Proveedor agregado correctamente');
        return res.redirect('/proveedores');
    });
};

exports.deleteProveedor = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tproveedores WHERE idproveedor = ?', [id], (err) => {
        if (err) {
            req.flash('error', 'Error al eliminar el proveedor');
            return res.redirect('/proveedores');
        }
        req.flash('success', 'Proveedor eliminado correctamente');
        return res.redirect('/proveedores');
    });
};
