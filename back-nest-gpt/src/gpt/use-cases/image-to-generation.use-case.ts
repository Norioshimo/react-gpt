import OpenAI from "openai";
import { downloadBase64ImageAsPng, downloadImageAsPng } from "src/helpers";
import * as fs from 'fs';
import * as path from 'path';

interface Options {
    prompt: string;
    originalImage?: string;
    maskImage?: string;
}

export const imageToGenerationUseCase = async (openai: OpenAI, options: Options) => {
    const { prompt, originalImage, maskImage } = options;

    // Todo: Verifiar original image
    if (!originalImage || !maskImage) {


        const response = await openai.images.generate({
            prompt: prompt,
            model: 'dall-e-3',
            n: 1,
            size: '1024x1024',
            quality: 'standard',
            response_format: 'url',
        })

        // Todo: guardar la imagen en FS
        let fileName = '';
        if (response.data && response.data[0].url) {
            fileName = await downloadImageAsPng(response.data[0].url)
        }

        const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

        return {
            url,
            openAIUrl: response.data ? response.data[0].url : null,
            revised_prompt: response.data ? response.data[0].revised_prompt : null
        }
    }


    // originalImagen http://localhost:3000/gpt/image-generation/798432.png
    const pngImagePath = await downloadImageAsPng(originalImage,true);

    const maskPath = await downloadBase64ImageAsPng(maskImage,true);

    const response = await openai.images.edit({
        model: 'dall-e-2',
        prompt: prompt,
        image: fs.createReadStream(pngImagePath),
        mask: fs.createReadStream(maskPath),
        n: 1,
        size: '1024x1024',
        response_format: 'url'

    })

    let localImagePath;
    if (response.data && response.data[0].url) {
        localImagePath = await downloadImageAsPng(response.data[0].url);
    }

    const fileName = path.basename(localImagePath);

    const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

    return {
        url,
        openAIUrl: response.data ? response.data[0].url : null,
        revised_prompt: response.data ? response.data[0].revised_prompt : null
    }

}


