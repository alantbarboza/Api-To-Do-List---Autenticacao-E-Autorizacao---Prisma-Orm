//upload de arquivos
//yarn add multer               
//yarn add @types/multer -d
import multer from "multer";

export const storage = multer.diskStorage({
    destination: function(Req, File, cb){
        cb(null, 'uploads/');
    },
    filename: function(Req, File, cb){
        const splitExtension = File.originalname.split('.');
        const fileName = `${splitExtension[0]}`;
        const extension = `.${splitExtension[1]}`;
        cb(null, `${fileName}-${Date.now()}${extension}`);
    }
});

export default storage;