const {Kategori} = require('../../models')

class KategoriController {
    static async viewKategori (req, res) {
        try {
            let login = true

            const kategoris = await Kategori.findAll({where: {isDelete: false}})

            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }

            if(req.session.user == null | req.session.user == undefined) login = false
            res.render('user/kategori', {
                kategoris,
                alert,
                aktifMenu: 'Kategori',
                title: 'Kategori Produk',
                isLogin: login
            })
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'danger')
            return res.redirect('/')
        }
    }
}

module.exports = KategoriController