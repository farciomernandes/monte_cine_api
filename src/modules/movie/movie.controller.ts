import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  Delete,
  Put,
  Param,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { SearchParamsDto } from 'src/shared/filter/search-params.dto';
import { MovieProvider } from './providers/movie.provider';
import { SaveMovieDto } from './dtos/save-movie.dto';
import { MovieModelDto } from './dtos/movie-model.dto';
import { PaginationDto } from 'src/shared/filter/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multerConfig from '@infra/config/multerConfig';
import { Multer } from 'multer';

@ApiTags('Movie')
@Controller('movies')
@UseInterceptors(CacheInterceptor)
export class MovieController {
  constructor(private readonly movieProvider: MovieProvider) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('banner', multerConfig))
  @ApiOperation({
    summary: 'Criar uma filme',
  })
  @ApiBody({
    type: SaveMovieDto,
    description: 'Payload para criar uma filme',
  })
  @ApiOkResponse({
    description: 'filme criada com sucesso',
    type: MovieModelDto,
  })
  @HttpCode(HttpStatus.OK)
  async saveMovie(
    @Body() payload: Omit<SaveMovieDto, 'banner'>,
    @UploadedFile() banner: Multer.File,
  ): Promise<MovieModelDto> {
    if (payload.categories && typeof payload.categories === 'string') {
      try {
        const cleanedCategories = (payload.categories as string)
          .replace(/[\r\n]/g, '')
          .replace(/}{/g, '},{');

        payload.categories = JSON.parse(`[${cleanedCategories}]`);
      } catch (error) {
        throw new BadRequestException('Invalid categories JSON format!');
      }
    }

    return this.movieProvider.saveOrUpdateMovie(payload, banner);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('banner', multerConfig))
  @ApiOperation({
    summary: 'Atualizar uma filme',
  })
  @ApiBody({
    type: SaveMovieDto,
    description: 'Payload para atualizar uma filme',
  })
  @ApiOkResponse({
    description: 'filme atualizada com sucesso',
    type: MovieModelDto,
  })
  @HttpCode(HttpStatus.OK)
  async updateMovie(
    @Param('id') id: string,
    @Body() payload: Omit<SaveMovieDto, 'banner'>,
    @UploadedFile() banner: Multer.File,
  ): Promise<MovieModelDto> {
    if (payload.categories && typeof payload.categories === 'string') {
      try {
        const cleanedCategories = (payload.categories as string)
          .replace(/[\r\n]/g, '')
          .replace(/}{/g, '},{');

        payload.categories = JSON.parse(`[${cleanedCategories}]`);
      } catch (error) {
        throw new BadRequestException('Invalid categories JSON format!');
      }
    }
    return this.movieProvider.saveOrUpdateMovie(payload, banner, id);
  }

  @Get()
  @ApiOperation({
    summary: 'Obter todas as filmes',
  })
  @ApiOkResponse({
    description: 'Retorna todas as filmes',
    type: PaginationDto<MovieModelDto>,
  })
  @HttpCode(HttpStatus.OK)
  async getCategories(
    @Query() queryParams: SearchParamsDto,
  ): Promise<PaginationDto<MovieModelDto>> {
    return this.movieProvider.findAll(queryParams);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar uma filme',
  })
  @ApiOkResponse({
    description: 'filme deletada com sucesso',
    type: MovieModelDto,
  })
  @HttpCode(HttpStatus.OK)
  async deleteMovie(@Param('id') id: string): Promise<MovieModelDto> {
    return this.movieProvider.delete(id);
  }
}
