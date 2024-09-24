export const productValidator = (req, res, next) => {
    if (req.body.id) {
        res.status(404).json({ msg: 'No se debe enviar ID. El mismo es generado automáticamente en el servidor' })
    } else if (
        req.body.status === undefined || 
        req.body.title === undefined ||
        req.body.description === undefined ||
        req.body.code === undefined ||
        req.body.price === undefined ||
        req.body.stock === undefined ||
        req.body.category === undefined
    ) res.status(404).json({ msg: 'Faltan datos de producto' });
    else next()
}
