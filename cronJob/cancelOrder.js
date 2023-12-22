const {Pesanan, Pembeli_Produk_Pesanan, Produk} = require('../models')

const updateStatus = async (orderId) => {
    await Pesanan.update(
        {Status: 'Pesanan Dibatalkan'},
        {where: { id: orderId }
    })
}

const allOrderUser = async (userId, orderId) => {
    const orderUser = await Pembeli_Produk_Pesanan.findAll({
        where: {
            Pembeli_Id: userId,
            Pesanan_Id: orderId,
        }
    })
    return orderUser 
}

const updateProduct = async (productId, totalProduct) => {
    const product = await Produk.findByPk(productId)
    const payload = {
        Stok_Produk: product.Stok_Produk + totalProduct,
        Produk_Terjual: product.Produk_Terjual - totalProduct
    }
    await Produk.update(payload, {where: {id: productId}})
}

const cancelOrder = async () => {
    const order = await Pesanan.findAll(
        {where: {Status: 'Menunggu Pembayaran'}})

    for(let i = 0; i < order.length; i++) {
        if( Date.now() >= order[i].Akhir_Pembayaran){
            let userId = order[i].Pembeli_Id
            let orderId = order[i].id
            await updateStatus(orderId)
            let orderUser = await allOrderUser(userId, userId)

            for(let j = 0; j < orderUser.length; j++) {
                let productId = orderUser[j].Produk_Id
                let totalProduct = orderUser[j].Jumlah
                await updateProduct(productId, totalProduct)
            }
        }
    }
}

module.exports = cancelOrder