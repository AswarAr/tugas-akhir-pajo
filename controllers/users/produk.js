const {Produk, Kategori} = require('../../models')
class ProdukController {
    static async viewProduk (req, res) {
        const {kategoriId} = req.params
        let login = true
        try{
            const produk = await Produk.findAll({where: {Kategori_Id: kategoriId, isDelete: false}})
            const kategori = await Kategori.findOne({where: {id: kategoriId, isDelete: false}})
            if(req.session.user == null | req.session.user == undefined) login = false
            res.render('user/produk', {
                kategori,
                produk,
                title: 'Daftar Produk',
                aktifMenu: 'Kategori',
                isLogin: login
            })
        }catch(err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'danger')
            return res.redirect('/')
        }
    }
}

module.exports = ProdukController