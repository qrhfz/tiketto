const Transaksi = require('../models/transaksi')

module.exports = {
    update: async (req, res) => {
        try {
            let { nama_barang, pengiriman, pembayaran, pengembalian, tanggal_sewa, tanggal_kembali } = req.body
            pengiriman = pengiriman.concat('/', pengembalian)
            await Transaksi.update({
                nama_barang, pengiriman, pembayaran, tanggal_sewa, tanggal_kembali
            }, {
                where: { id_transaksi: req.params.id }
            }).then(result => {
                res.redirect(`/user/${req.cookies.id_user}/transaksi`)
            })
        } catch (error) {
            console.log(error)
        }
    },
    updateStatus: async (req, res) => {
        try {
            let { status } = req.body
            await Transaksi.update({
                status
            }, {
                where: { id_transaksi: req.params.id }
            }).then(result => {
                res.redirect(`/admin/${req.cookies.id_admin}/transaksi`)
            })
        } catch (error) {
            console.log(error)
        }
    }
}