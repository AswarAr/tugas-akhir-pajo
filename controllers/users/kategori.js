const {Kategori} = require('../../models')

class KategoriController {
    static async viewKategori (req, res) {
        try {
            const kategoris = await Kategori.findAll({where: {isDelete: false}})
    
            res.render('user/kategori', {
                kategoris,
                aktifMenu: 'Kategori',
            })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = KategoriController