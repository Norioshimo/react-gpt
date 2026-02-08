import { BadRequestException, Body, Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { GptService } from './gpt.service';
import { AudioToTextDto, ImageGenerationDto, ImageVariationDto, Orthography, ProsConsDiscusser, TextToAudioDto, TranslateDto } from './dtos';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './generated/uploads',
        filename: (req, file, cb) => {
          const ext = file.originalname.split('.').pop();
          cb(null, `${Date.now()}.${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('audio/')) {
          return cb(
            new BadRequestException('Solo archivos de audio'),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  @Post('audio-to-text')
  async audioToText(
    @UploadedFile() file: Express.Multer.File,
    @Body() audioToTextDto: AudioToTextDto
  ) {
    return this.gptService.audioToText(file, audioToTextDto);
  }

  @Post('image-generation')
  async imageGeneration(
    @Body() imageGenerationDto: ImageGenerationDto
  ) {
    return await this.gptService.imageGeneration(imageGenerationDto);
  }

  @Get('image-generation/:filename')
  async getGeneratedImage(
    @Res() res: Response,
    @Param("filename") fileName: string
  ) {
    const filePath = await this.gptService.getGeneratedImage(fileName);
    console.log(`filePath: ${filePath}`)
    res.status(HttpStatus.OK);
    res.sendFile(filePath);
  }

   @Post('image-variation')
  async imageVariation(
    @Body() imageVariationDto: ImageVariationDto
  ) {
    return await this.gptService.generationImageVariation(imageVariationDto);
  }
}
