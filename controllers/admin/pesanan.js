const { where } = require('sequelize')
const {Pesanan, Pembeli, Pembeli_Produk_Pesanan, Produk } = require('../../models')

class PesananController {

    static async viewBeranda (req, res) {
        try {
            const pesanan = await Pesanan.findAll()
            const pesananAwaitPayment = await Pesanan.findAll({where: {Status: 'Menunggu Pembayaran'}})
            return res.render('admin/beranda', {
                pesanan,
                pesananAwaitPayment,
                title: 'Beranda Admin',
            })
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/kelola-pesanan')
        }
    }
    static async viewPesanan (req, res) {
        try {
            const pesanan = await Pesanan.findAll({
                order: [['id', 'ASC']],
                include: [
                    {model: Pembeli}
                ]
            })
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
            return res.render('admin/kelola-pesanan',{
                pesanan,
                alert,
                title: 'Daftar Pesanan Pembeli',
            })
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/kelola-pesanan')
        }
    }

    static async komfirmasiPesanan (req, res) {
        try {
            const {pesananId} = req.params
            const validatePesanan = await Pesanan.findOne({
                where : {
                    id: pesananId,
                    Status: 'Menunggu Validasi',
                }
            })
            if(!validatePesanan) {
                req.flash('alertMessage', 'Pesanan Sudah Divalidasi atau Pembeli Belum Melakukan Pembayaran')
                req.flash('alertStatus', 'fail')
                return res.redirect('/admin/daftar-pesanan')
            }
            await Pesanan.update(
                {
                    Status: 'Pesanan Diproses',
                }, 
            {where : {id: pesananId}})
            const daftarProduk = await Pembeli_Produk_Pesanan.findAll({
                where: {
                    Pembeli_Id:validatePesanan.Pembeli_Id,
                    Pesanan_Id: validatePesanan.id
                }
            })
            for (let i = 0; i < daftarProduk.length; i++) {
                const produk = await Produk.findOne({where : {id: daftarProduk[i].Produk_Id}})
                await Produk.update({
                    Stok_Produk: produk.Stok_Produk - daftarProduk[i].Jumlah,
                    Produk_Terjual: produk.Produk_Terjual + daftarProduk[i].Jumlah,
                }, {where: {id: daftarProduk[i].Produk_Id}})
            }
            req.flash('alertMessage', 'Pesanan Berhasil Konfirmasi')
            req.flash('alertStatus', 'success')
            return res.redirect('/admin/daftar-pesanan')
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/daftar-pesanan')
        }
    }

    static async viewDetailPesanan (req, res) {
        const {pesananId} = req.params
        try {
           const pesanan = await Pesanan.findByPk(pesananId)
           const produk = await Pembeli_Produk_Pesanan.findAll({
            where : {
                Pesanan_Id: pesananId,
                Pembeli_Id: pesanan.Pembeli_Id,
            },
             include: [Produk]
           })
            req.flash('alertMessage', 'Pesanan Berhasil Konfirmasi')
            req.flash('alertStatus', 'success')
            return res.redirect('/admin/kelola-pesanan')
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/kelola-pesanan')
        }
    } 

    static async viewPesananProduk (req, res) {
        try {
            const {pesananId} = req.params
            const pesanan = await Pesanan.findByPk(pesananId)
            const daftarProduk = await  Pembeli_Produk_Pesanan.findAll(
                {where : {
                    Pembeli_Id: pesanan.Pembeli_Id,
                    Pesanan_Id: pesananId,
                },
                include: [Produk]
            })
            req.flash('alertMessage', 'Kategori yang di masukan tidak tersedia')
            req.flash('alertStatus', 'succes')
            return res.render('admin/daftar-pesanan-produk', {
                daftarProduk
            })
        } catch (err) {
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'fail')
            return res.redirect('/admin/kelola-pesanan')
        }
    }

}
module.exports = PesananController