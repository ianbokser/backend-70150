export const idValidator = (req, res, next) => {
    if (req.body.id && req.body.id != req.params.idProd) {
        res.status(404).json({ msg: 'No se puede cambiar Id de producto' })
    } else {
        next()
    }
}