// const Keranjang = require('../models/keranjang')


module.exports = {
    create: async(req, res) => {
        try {
            let { id_barang, jumlah, id_user } = req.body
            Keranjang.create({
                jumlah,
                id_barang,
                id_user
            }).then(result => {
                res.redirect(`/user/${req.cookies.id_user}/barang`)
            })
        } catch (error) {
            console.log(error)
        }
    }
}