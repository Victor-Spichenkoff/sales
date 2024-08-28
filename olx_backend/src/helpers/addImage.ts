import jimp from "jimp"
import path from "path";
import { v4 as uuid } from "uuid"


export const addImage = async (buffer: any) => {
    let newName = `${uuid()}.jpg`
    
    const imagePath = path.resolve(__dirname, '../../public/assets/userImages/', newName);

    let tempImg = await jimp.read(buffer)
    tempImg.cover(500, 500).quality(80).write(imagePath)//sem distorcer, mas deve dar isso

    return newName
}