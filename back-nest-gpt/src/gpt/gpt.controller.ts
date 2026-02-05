import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { Orthography, ProsConsDiscusser, TextToAudioDto, TranslateDto } from './dtos';
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

  @Post('translate')
  translateText(
    @Body() translateDto: TranslateDto
  ) {
    return this.gptService.translateText(translateDto);
  }

  @Post('text-to-audio')
  async textToAudio(
    @Body() textToAudioDto: TextToAudioDto,
    @Res() res: Response
  ) {
    const filepath = await this.gptService.textToAudioDto(textToAudioDto);

    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK)
    res.sendFile(filepath);
  }

  @Get('text-to-audio/:fileId')
  async textToAudioGetter(
    @Res() res: Response,
    @Param('fileId') fileId: string
  ) {
    const filepath = await this.gptService.textToAudioGetter(fileId);

    res.setHeader('Content-Type', 'audio/mp3');
    res.status(HttpStatus.OK)
    res.sendFile(filepath);
  }

}
