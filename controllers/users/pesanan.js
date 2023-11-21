const { Op } = require('sequelize')
const {Pembeli_Produk_Pesanan, Pesanan, Produk, Keranjang, Pembayaran} = require('../../models')
const {saveImage} = require('../../helper/firebase')

let date = new Date();
let dateString = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
let login = true

class PesananController {
    static async viewPesanan (req, res) {
        const {id: userId} = req.session.user
        try {
            let totalPesanan = 0
            const validatekeranjang = await Keranjang.findAll({
                where: {Pembeli_Id: userId},
                include: [
                    {model: Produk}
                ]})
                if(!validatekeranjang[0]) return res.redirect('/kategori')
            for(let i = 0; i < validatekeranjang.length; i++) {
                    totalPesanan += validatekeranjang[i].Total_Harga
                    const validateJumlahProduk = await Produk.findOne(
                        {where: {
                            id:validatekeranjang[i].Produk_Id,
                            Stok_Produk: {[Op.lt]: validatekeranjang[i].Jumlah},
                        }})
                    if(validateJumlahProduk) {
                        req.flash('alertMessage', `Jumlah ${validatekeranjang[i].Produk.Nama_Produk} Yang Tersedia Tidak Mencukupi`)
                        req.flash('alertStatus', 'danger')
                        return res.redirect('/keranjang')
                    }
                }
            if(req.session.user == null | req.session.user == undefined) login = false
            return res.render('user/konfirmasi-pembayaran', {
                keranjang: validatekeranjang,
                totalHarga: totalPesanan,
                title: 'Daftar Pesanan',
                aktifMenu: 'Konfirmasi Pembayaran',
                isLogin: login
            })
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'danger')
            return res.redirect('/')
        }
    }
    static async postPesanan (req, res) {
        const {id: userId} = req.session.user
        try {
            let totalPesanan = 0
            const validatekeranjang = await Keranjang.findAll({
                where: {Pembeli_Id: userId},
                include: [
                    {model: Produk}
                ]})
                for(let i = 0; i < validatekeranjang.length; i++) {
                    totalPesanan += validatekeranjang[i].Total_Harga
                    const validateJumlahProduk = await Produk.findOne(
                        {where: {
                            id:validatekeranjang[i].Produk_Id,
                            Stok_Produk: {[Op.lt]: validatekeranjang[i].Jumlah},
                        }})
                    if(validateJumlahProduk) {
                        req.flash('alertMessage', `Jumlah ${validatekeranjang[i].Produk.Nama_Produk} Yang Tersedia Tidak Mencukupi`)
                        req.flash('alertStatus', 'danger')
                        return res.redirect('/keranjang')
                    }
                }
            const cekPesanan = await Pesanan.findOne({where: {Pembeli_Id: userId, Status: 'Menunggu Pembayaran'}})
            if(cekPesanan) {
                req.flash('alertMessage', 'Anda Masih Punya Pesanan Belum Dibayar Silahkan Bayar Dulu!')
                req.flash('alertStatus', 'fail')
                return res.redirect('/upload-bukti-pembayaran')
            }
            const createPesanan = await Pesanan.create({
                Pembeli_Id: userId,
                Total: totalPesanan,
                Tanggal: dateString,
                Status: 'Menunggu Pembayaran',
            })
            let sisaProduk = 0
            for(let i = 0; i < validatekeranjang.length; i++) { 
                sisaProduk = validatekeranjang[i].Produk.Stok_Produk - validatekeranjang[i].Jumlah
                await Pembeli_Produk_Pesanan.create({
                    Pembeli_Id: userId,
                    Pesanan_Id: createPesanan.id,
                    Produk_Id: validatekeranjang[i].Produk_Id,
                    Jumlah:validatekeranjang[i].Jumlah,
                    Total: validatekeranjang[i].Total_Harga,
                })
                await Produk.update({Stok_Produk: sisaProduk},
                    {where: {id: validatekeranjang[i].Produk_Id}
                })
            }
            await Keranjang.destroy({
                where: {Pembeli_Id: userId}
            })
             return res.redirect('/keranjang')
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'danger')
            return res.redirect('/')
        }
    }

    static async viewUploadBuktiPembayran (req, res) {
        const {id: userId} = req.session.user
        try {
            const pesanan = await Pesanan.findOne({where: {Pembeli_Id: userId, Status: 'Menunggu Pembayaran'}})
            const pembayaran = await Pembayaran.findAll()
            if(!pesanan){
                req.flash('alertMessage', 'Pesanan Tidak Ditemukan Silahkan Melakukan Pesanan')
                req.flash('alertStatus', 'danger')
                return res.redirect('/kategori')
            }
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus }
            if(req.session.user == null | req.session.user == undefined) login = false
            return res.render('user/upload-bukti-pembayaran', {
                pesanan,
                pembayaran,
                alert,
                title: 'Upload Bukti Pembayaran',
                aktifMenu: 'Konfirmasi Pembayaran',
                isLogin: login
            })
        }catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'danger')
            return res.redirect('/')
        }
    }

    static async uploadBuktiPembayaran (req, res) {
        const {id: userId} = req.session.user
        const {pesananId} = req.params
        try {
            const validatePesanan = await Pesanan.findOne({
                where: {
                    id: pesananId,
                    Pembeli_Id: userId,
                    Status: 'Menunggu Pembayaran',
                }
            }) 
            if(!validatePesanan) {
                req.flash('alertMessage', 'Pesanan Tidak Ditemukan')
                req.flash('alertStatus', 'danger')
                return res.redirect('/keranjang')
            }
            const urlGambar = await saveImage(req.files[0])
            const payload = {
                Bukti_Pembayaran: urlGambar,
                Status: 'Menunggu Validasi',
            }
           await Pesanan.update(payload,{ where: {
                id: pesananId
            }})
            req.flash('alertMessage', 'Bukti Pembayaran Berhasil Diupload')
            req.flash('alertStatus', 'Success')
            return res.redirect('/keranjang')
        } catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'danger')
            return res.redirect('/')
        }
    }

    static async riwayatPesanan (req, res) {
        const {id: userId} = req.session.user
        try {
            const pesanan = await Pesanan.findAll({
                where: {
                    Pembeli_Id: userId,
                },
                order: [['id', 'DESC']],
                include: [
                    {
                        model: Pembeli_Produk_Pesanan,
                    include: Produk}
                ]})
            if(req.session.user == null | req.session.user == undefined) login = false
            return res.render('user/riwayat-pemesanan', {
            pesanan,
            title: 'Riwayat Pesanan',
            aktifMenu: 'Riwayat Pesanan',
            isLogin: login
        })
        }catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'danger')
            return res.redirect('/keranjang')
        }
    }

    static async daftarPesanan (req, res) {
        const {id: userId} = req.session.user
        try {
            const pesanan = await Pesanan.findAll({
                where: {
                    Pembeli_Id: userId,
                },
                order: [['id', 'DESC']],
                include: [
                    {
                    model: Pembeli_Produk_Pesanan,
                    include: Produk}
                ]})
            if(req.session.user == null | req.session.user == undefined) login = false
            return res.render('user/daftar-pesanan', {
            pesanan,
            title: 'Daftar Pesanan',
            aktifMenu: 'Daftar Pesanan',
            isLogin: login
        })
        }catch (err) {
            console.log(err)
            req.flash('alertMessage', err.message)
            req.flash('alertStatus', 'danger')
            return res.redirect('/keranjang')
        }
    }
}

module.exports = PesananController