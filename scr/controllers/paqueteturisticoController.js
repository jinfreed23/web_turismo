const db = require('../lib/database');

exports.getAllPackages = (req, res) => {
    db.query(
        'SELECT s.*, p.razon_social FROM tserviciospro s ' +
        'JOIN tproveedores p ON s.idproveedor = p.idproveedor',
        (err, results) => {
            if (err) {
                console.error(err); 
                req.flash('error', 'Error al obtener los servicios');
                return res.redirect('/');
            }
            db.query('SELECT * FROM tpaqueteturistico',
                (err, pturistico) => {
                    if (err) {
                        console.error(err); 
                        req.flash('error', 'Error al obtener los paquetes turisticos');
                        return res.redirect('/');
                    }
                    db.query('SELECT * FROM tusuario',
                        (err, user) => {
                            if (err) {
                                console.error(err); 
                                req.flash('error', 'Error al obtener los usuarios');
                                return res.redirect('/');
                            }
                            const loggedUser = req.session.nombre || ''; 
                            res.render('links/paqueteturistico', { serv: results, pturistico, user, loggedUser });
                        }
                    );  
                }
            );            
        }
    );
};

exports.addPackage = (req, res) => {
    const { idusuario, destino, stock, fechaInicio, fechaFin, precio, actividades, addedServices} = req.body;
    const packageQuery = 'INSERT INTO tpaqueteturistico (idusuario, destino, stock, fechaInicio, fechaFin, precio, actividades) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(packageQuery, [idusuario, destino, stock, fechaInicio, fechaFin, precio, actividades], (err, result) => {
        if (err) {
            console.error(err); 
            req.flash('error', 'Error al agregar el paquete turístico');
            return res.redirect('/paqueteturistico');
        }

        const idPaqueteTuristico  = result.insertId; 
        
        const querySerPack = 'INSERT INTO tservi_paquetes (idservicios , idPaqueteTuristico) VALUES (?, ?)';
        const promises = [];

        if (addedServices && addedServices.length > 0) {
            addedServices.forEach(servicio => {
                promises.push(new Promise((resolve, reject) => {
                    db.query(querySerPack, [servicio.idserviciospro, idPaqueteTuristico], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                }));
            });
        }

        Promise.all([...promises])
            .then(() => {
                req.flash('success', 'Paquete turistico agregado correctamente');
                return res.redirect('/paqueteturistico');
            })
            .catch(() => {
                req.flash('error', 'Error al agregar el paquete turistico');
                return res.redirect('/paqueteturistico');
            });

    });
};


exports.updatePackage = (req, res) => {
    const { idPaqueteTuristico, idusuario, destino, stock, fechaInicio, fechaFin, precio, actividades } = req.body;

    console.log({ idPaqueteTuristico, idusuario, destino, stock, fechaInicio, fechaFin, precio, actividades });

    const updateQuery = `
        UPDATE tpaqueteturistico 
        SET idusuario = ?, destino = ?, stock = ?, fechaInicio = ?, fechaFin = ?, precio = ?, actividades = ? 
        WHERE idPaqueteTuristico = ?`;

    db.query(updateQuery, [idusuario, destino, stock, fechaInicio, fechaFin, precio, actividades, idPaqueteTuristico], (err) => {
        if (err) {
            req.flash('error', 'Error al actualizar el paquete turístico');
            return res.redirect('/paqueteturistico');
        }
        req.flash('success', 'Paquete turístico actualizado correctamente');
        return res.redirect('/paqueteturistico');
    });
};



exports.deletePackage = (req, res) => {
    const { id } = req.params;
    const deletePackageQuery = 'DELETE FROM tpaqueteturistico WHERE idPaqueteTuristico = ?';

    db.query(deletePackageQuery, [id], (err) => {
        if (err) {
            req.flash('error', 'Error al eliminar el paquete turístico');
            return res.redirect('/paqueteturistico');
        }
        req.flash('success', 'Paquete turístico eliminado correctamente');
        return res.redirect('/paqueteturistico');
    });
};
