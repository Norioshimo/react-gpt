import OpenAI from "openai";
import * as fs from 'fs';

interface Options {
    prompt?: string;
    audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async (openai: OpenAI, options: Options) => {

    const { prompt, audioFile } = options;

    console.log(`prompt es: ${prompt}`)

    const response = await openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: fs.createReadStream(audioFile.path),
        prompt,
        language: 'es',
        response_format:'json',
    
    })

    return response;
}


