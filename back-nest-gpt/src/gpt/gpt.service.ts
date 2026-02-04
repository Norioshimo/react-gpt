import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { Orthography } from './dtos';
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

}
