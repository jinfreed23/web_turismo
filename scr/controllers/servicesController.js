const db = require('../lib/database');

exports.getAllServicios = (req, res) => {
    db.query(
        'SELECT s.*, p.razon_social FROM tserviciospro s ' +
        'JOIN tproveedores p ON s.idproveedor = p.idproveedor',
        (err, results) => {
            if (err) {
                console.error("Error al obtener los servicios:", err);  // Imprime el error en la consola
                req.flash('error', 'Error al obtener los servicios');
                return res.redirect('/');
            }
            
            db.query('SELECT * FROM tproveedores', (err, proveedores) => {
                if (err) {
                    console.error("Error al obtener los proveedores:", err);  // Imprime el error en la consola
                    req.flash('error', 'Error al obtener los proveedores');
                    return res.redirect('/');
                }
                res.render('links/servicios', { variableservicios: results, proveedores });
            });
        }
    );
};


exports.addServicio = (req, res) => {
    const { idproveedor, nombre_servicio, descripcion_servicio, categoria_servicio, costo, evaluacion } = req.body;
    const query = 'INSERT INTO tserviciospro (idproveedor, nombre_servicio, descripcion_servicio, categoria_servicio, costo, evaluacion) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [idproveedor, nombre_servicio, descripcion_servicio, categoria_servicio, costo, evaluacion], (err) => {
        if (err) {
            req.flash('error', 'Error al agregar el servicio');
            return res.redirect('/servicios');
        }
        req.flash('success', 'Servicio agregado correctamente');
        return res.redirect('/servicios');
    });
};

exports.updateServicio = (req, res) => {
    const { idserviciospro, idproveedor, nombre_servicio, descripcion_servicio, categoria_servicio, costo, evaluacion } = req.body;
    const query = 'UPDATE tserviciospro SET idproveedor = ?, nombre_servicio = ?, descripcion_servicio = ?, categoria_servicio = ?, costo = ?, evaluacion = ? WHERE idserviciospro = ?';

    db.query(query, [idproveedor, nombre_servicio, descripcion_servicio, categoria_servicio, costo, evaluacion, idserviciospro], (err) => {
        if (err) {
            req.flash('error', 'Error al actualizar el servicio');
            return res.redirect('/servicios');
        }
        req.flash('success', 'Servicio actualizado correctamente');
        return res.redirect('/servicios');
    });
};

exports.deleteServicio = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tserviciospro WHERE idserviciospro = ?', [id], (err) => {
        if (err) {
            req.flash('error', 'Error al eliminar el servicio');
            return res.redirect('/servicios');
        }
        req.flash('success', 'Servicio eliminado correctamente');
        return res.redirect('/servicios');
    });
};
