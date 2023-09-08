import multer from "multer"

//storage-config
const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,"./uploads")
    },
    filename: (req,file,callback) => {
        const filename = `image-${Date.now()}.${file.originalname}`
        callback(null,filename)
    }
})

//file-filter
const filefilter = (req,file,callback)=>{
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"){
    callback(null, true)
    }else{
        callback(null, false)
        throw new Error("Only png, jpg, & jpeg file formats are allowed")
    }
}

const upload = multer({
    storage: storage,
    fileFilter: filefilter
})

export default upload