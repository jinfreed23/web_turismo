const db = require('../lib/database');

exports.getAllReserva = (req, res) => {
    db.query(
        'SELECT * FROM treserva',
        (err, results) => {
            if (err) {
                console.error(err); 
                req.flash('error', 'Error al obtener las reservas');
                return res.redirect('/');
            }
            db.query('SELECT * FROM tpaqueteturistico',
                (err, pturistico) => {
                    if (err) {
                        console.error(err); 
                        req.flash('error', 'Error al obtener los paquetes turisticos');
                        return res.redirect('/');
                    }
                    db.query('SELECT * FROM tcliente',
                        (err, client) => {
                            if (err) {
                                console.error(err); 
                                req.flash('error', 'Error al obtener los clientes');
                                return res.redirect('/');
                            }
                            res.render('links/reserva', { reserv: results, pturistico, client });
                        }
                    );  
                }
            );            
        }
    );
};

exports.addReserva = (req, res) => {
}

exports.updateReserva = (req, res) => {
    const { idreserva , idCliente , fechaReserva, cantidad, estado } = req.body;
    const query = 'UPDATE tmateriales SET idCliente = ?, fechaReserva = ?, cantidad = ?, estado = ? WHERE idreserva = ?';

    db.query(query, [idCliente , fechaReserva, cantidad, estado, idreserva], (err) => {
        if (err) {
            req.flash('error', 'Error al actualizar el reserva');
            return res.redirect('/reserva');
        }
        req.flash('success', 'Reserva actualizado correctamente');
        return res.redirect('/reserva');
    });
}

exports.deleteReserva = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM treserva WHERE idreserva = ?', [id], (err) => {
        if (err) {
            req.flash('error', 'Error al eliminar la reserva');
            return res.redirect('/reserva');
        }
        req.flash('success', 'Reserva eliminada correctamente');
        return res.redirect('/reserva');
    });
}