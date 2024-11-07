const db = require('../lib/database');

exports.getAllPagos = (req, res) => {
    db.query('SELECT * FROM tpago', (err, results) => {
        if (err) {
            req.flash('error', 'Error al obtener los pagos');
            return res.redirect('/');
        }
        res.render('links/pagos', { pagos: results });
    });
};

exports.updatePago = (req, res) => {
    const { idpago, idReserva, monto, metodoPago, estado, fecha } = req.body;
    const query = 'UPDATE tpago SET idReserva = ?, monto = ?, metodoPago = ?, estado = ?, fecha = ? WHERE idpago = ?';

    db.query(query, [idReserva, monto, metodoPago, estado, fecha, idpago], (err) => {
        if (err) {
            req.flash('error', 'Error al actualizar el pago');
            return res.redirect('/pagos');
        }
        req.flash('success', 'Pago actualizado correctamente');
        return res.redirect('/pagos');
    });
};

exports.addPago = (req, res) => {
    const { idReserva, monto, metodoPago, estado, fecha } = req.body;
    const query = 'INSERT INTO tpago (idReserva, monto, metodoPago, estado, fecha) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [idReserva, monto, metodoPago, estado, fecha], (err) => {
        if (err) {
            req.flash('error', 'Error al agregar el pago');
            return res.redirect('/pagos');
        }
        req.flash('success', 'Pago agregado correctamente');
        return res.redirect('/pagos');
    });
};

exports.deletePago = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tpago WHERE idpago = ?', [id], (err) => {
        if (err) {
            req.flash('error', 'Error al eliminar el pago');
            return res.redirect('/pagos');
        }
        req.flash('success', 'Pago eliminado correctamente');
        return res.redirect('/pagos');
    });
};
