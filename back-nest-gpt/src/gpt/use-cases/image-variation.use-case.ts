import OpenAI from "openai";
import { downloadImageAsPng } from "src/helpers";
import * as fs from 'fs'


interface Options {
    baseImage: string;
}

export const imageVariationUseCase = async (openai: OpenAI, options: Options) => {
    const { baseImage } = options;

    const pngImageFullPath = await downloadImageAsPng(baseImage, true);

    const response = await openai.images.createVariation({
        model: 'dall-e-2',
        image: fs.createReadStream(pngImageFullPath),
        n: 1,
        size: '1024x1024',
        response_format: 'url'
    });

    let fileName = '';
    if (response.data && response.data[0].url) {
        fileName = await downloadImageAsPng(response.data[0].url, false)
    }
 
    const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;


    return {
        url,
        openAIUrl: response.data ? response.data[0].url : null,
        revised_prompt: response.data ? response.data[0].revised_prompt : null
    }
}