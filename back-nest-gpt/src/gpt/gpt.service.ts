import { Injectable, NotFoundException } from '@nestjs/common';
import { audioToTextUseCase, orthographyCheckUseCase, prosConsDiscusserStreamUseCase, prosConsDiscusserUseCase, textToAudioUseCase, translateUseCase } from './use-cases';
import { AudioToTextDto, Orthography, ProsConsDiscusser, TranslateDto } from './dtos';
import OpenAI from 'openai';
import { TextToAudioDto } from './dtos/text-to-audio.dto';
import * as  path from "path";
import * as  fs from "fs";

@Injectable()
export class GptService {

    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })

    // Solo va a llmar casos de uso

    async orthographyCheck(orthography: Orthography) {

        return await orthographyCheckUseCase(this.openai, {
            prompt: orthography.prompt
        });
    }


    async prosConsDiscusser({ prompt }: ProsConsDiscusser) {
        return await prosConsDiscusserUseCase(this.openai, { prompt });
    }

    async prosConsDiscusserStream({ prompt }: ProsConsDiscusser) {
        return await prosConsDiscusserStreamUseCase(this.openai, { prompt });
    }

    async translateText({ prompt, lang }: TranslateDto) {
        return await translateUseCase(this.openai, { prompt, lang });
    }

    async textToAudioDto({ prompt, voice }: TextToAudioDto) {
        console.log(`Traduciendo texto a audio`)
        return await textToAudioUseCase(this.openai, { prompt, voice });
    }

    async textToAudioGetter(fileId: string) {
        const filePath = path.resolve(__dirname, '../../generated/audios/', `${fileId}.mp3`);

        const wasFound = fs.existsSync(filePath);
        if (!wasFound) {
            new NotFoundException(`File id ${fileId} no exite`);
        }

        return filePath;
    }

    async audioToText(audioFile: Express.Multer.File, audioToTextDto: AudioToTextDto) {
        const { prompt } = audioToTextDto;
        return await audioToTextUseCase(this.openai, { audioFile, prompt });
    }
}
