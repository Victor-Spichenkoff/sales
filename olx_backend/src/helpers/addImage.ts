import fs from 'fs';
import jimp from "jimp"
import path from "path";
import { v4 as uuid } from "uuid"


export const addImage = async (buffer: any, returnPath = false) => {
    let newName = `${uuid()}.jpg`
    
    const imagePath = path.resolve(__dirname, '../../public/assets/userImages/', newName);

    let tempImg = await jimp.read(buffer)
    tempImg.cover(500, 500).quality(80).write(imagePath)//sem distorcer, mas deve dar isso

    if(returnPath)
        return {
            newName,
            imagePath
        }
        
    return newName
}

export const addImageAndDeleteOld = async (buffer: any, oldName: string) => {
    let newName = `${uuid()}.jpg`
    
    const imagePath = path.resolve(__dirname, '../../public/assets/userImages/', newName);

    let tempImg = await jimp.read(buffer)
    tempImg.cover(500, 500).quality(80).write(imagePath)//sem distorcer, mas deve dar isso

    const deletePath = path.resolve(__dirname, '../../public/assets/userImages/', oldName);
    console.log(deletePath)

    try {
        fs.unlinkSync(deletePath);
    } catch {
        console.log("Não foi possível apagar a imagem antiga")
    }

    return newName
}