
const {Keranjang, Produk} = require('../../models')

class KeranjangController {

    static async viewProduk(req, res) {
        const {id: userId} = req.session.user
        try {
            const keranjang = await Keranjang.findAll({
                where: {Pembeli_Id: userId},
                order: [['id', 'ASC']],
                include: [
                    {model: Produk}
                ]})
            res.render('user/keranjang', {
                keranjang,
                title: 'Produk',
                aktifMenu: 'Keranjang',
            })
        } catch(err){
            console.log(err)
        }
    }
    static async tambahProdukDiKeranjang(req, res) {
        const {produkId} = req.params
        const {id: userId} = req.session.user
        try {
            const produk = await Produk.findOne({where: {id: produkId, isDelete: false}})
            const validateProduk = await Keranjang.findOne({
                where: {Produk_Id: produkId, Pembeli_Id:userId}
            })
            if(validateProduk.Jumlah > produk.Stok_Produk) {
                req.flash('alertMessage', 'Sudah Mencapai Maksimal Pembelian')
                req.flash('alertStatus', 'danger')
                return res.redirect('/keranjang')
            }
            await Keranjang.update({
                Jumlah: validateProduk.Jumlah + 1,
                Total_Harga: validateProduk.Total_Harga + produk.Harga_Produk
                },
                {where: {Produk_Id: produkId, Pembeli_Id:userId}
            })
            res.redirect('/keranjang')
        }catch (err) {
            console.log(err)
        }
    }
    static async tambahProduk(req, res) {
        const {produkId} = req.params
        const {id: userId} = req.session.user
        try {
            const produk = await Produk.findOne({where: {id: produkId, isDelete: false}})
            const validateProduk = await Keranjang.findOne({
                where: {Produk_Id: produkId, Pembeli_Id:userId}})
            if(validateProduk){
                 if(validateProduk.Jumlah > (produk.Stok_Produk - 1)) {
                req.flash('alertMessage', 'Sudah Mencapai Maksimal Pembelian')
                req.flash('alertStatus', 'danger')
                return res.redirect(`/${produk.Kategori_Id}/produk`)
                 }
                await Keranjang.update({
                    Jumlah: validateProduk.Jumlah + 1,
                    Total_Harga: validateProduk.Total_Harga + produk.Harga_Produk
                },
                {where: {Produk_Id: produkId, Pembeli_Id:userId}})
            }else{
                await Keranjang.create({
                Produk_Id: produkId,
                Pembeli_Id: userId,
                Jumlah: 1,
                Total_Harga: produk.Harga_Produk,
            })
            }
            res.redirect(`/${produk.Kategori_Id}/produk`)
        }catch (err) {
            console.log(err)
        }
    }

    static async hapusProduk(req, res) {
        const {produkId} = req.params
        const {id: userId} = req.session.user
        try{
            const validateProduk = Keranjang.findOne({where: {Produk_Id: produkId, Pembeli_Id:userId}})
            if(!validateProduk){
                req.flash('alertMessage', 'Produk tidak ada dalam keranjang')
                req.flash('alertStatus', 'danger')
            }
            await Keranjang.destroy({
                where: {
                    Produk_Id: produkId, 
                    Pembeli_Id:userId
                }
            })
            res.redirect('/keranjang')
        }catch(err) {
            console.log(err)
        }
    }
}

module.exports = KeranjangController