import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { Orthography, ProsConsDiscusser } from './dtos';
import type { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) { }



  @Post('orthography-check')
  orthographyCheck(
    @Body() orthography: Orthography
  ) {
    return this.gptService.orthographyCheck(orthography);
  }

  @Post('pros-cons-discusser')
  prosConsDisusser(
    @Body() prosConsDisusser: ProsConsDiscusser
  ) {
    return this.gptService.prosConsDiscusser(prosConsDisusser);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDisusserStream(
    @Body() prosConsDisusser: ProsConsDiscusser,
    @Res() res: Response
  ) {

    const stream = await this.gptService.prosConsDiscusserStream(prosConsDisusser);


    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK)

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      //console.log(piece);
      res.write(piece);
    }

    res.end();
  }

}
