const {Produk, Kategori} = require('../../models')
class ProdukController {
    static async viewProduk (req, res) {
        const {kategoriId} = req.params
        try{
            const produk = await Produk.findAll({where: {Kategori_Id: kategoriId, isDelete: false}})
            const kategori = await Kategori.findOne({where: {id: kategoriId, isDelete: false}})
            res.render('user/produk', {
                kategori,
                produk,
                aktifMenu: 'Kategori',
            })
        }catch(err) {
            console.log(err)
            res.redirect('/')
        }
    }
}

module.exports = ProdukController