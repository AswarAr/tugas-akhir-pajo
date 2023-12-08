const firebase = require('firebase/app')
firebase.initializeApp({
    apiKey : process.env.apiKey,
    authDomain : process.env.authDomain,
    projectId : process.env.projectId,
    storageBucket : process.env.storageBucket,
    messagingSenderId : process.env.messagingSenderId,
    appId : process.env.appId
})
const {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } = require('firebase/storage')

const storage = getStorage()
const metaData = {
    contentType : 'image/jpeg'
}

const  uploadImage = async (files) => {
    const storageRef =  ref(storage, 'berkas-kelengkapan/' + new Date().getTime() + 'filesImages')
    const uploadTask = await uploadBytesResumable(storageRef, files.buffer, metaData)
    const downloadURL = await getDownloadURL(uploadTask.ref)
    return downloadURL
}
module.exports = {
    saveImage: async (files) => {
        const urlGrounds = await uploadImage(files)
        return urlGrounds
    },
    deleteImage: async (urlImage) => {
        const desertref = ref(storage, urlImage)
        await deleteObject(desertref)
    }
}