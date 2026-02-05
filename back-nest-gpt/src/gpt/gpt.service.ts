import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDiscusserStreamUseCase, prosConsDiscusserUseCase } from './use-cases';
import { Orthography, ProsConsDiscusser } from './dtos';
import OpenAI from 'openai';

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


    async prosConsDiscusser({prompt}:ProsConsDiscusser){
        return await prosConsDiscusserUseCase(this.openai,{prompt});
    }

    async prosConsDiscusserStream({prompt}:ProsConsDiscusser){
        return await prosConsDiscusserStreamUseCase(this.openai,{prompt});
    }


}
