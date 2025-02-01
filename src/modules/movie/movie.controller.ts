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
} from '@nestjs/common';
import {
  ApiBody,
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

@ApiTags('Movie')
@Controller('movies')
@UseInterceptors(CacheInterceptor)
export class MovieController {
  constructor(
    private readonly movieProvider: MovieProvider,
  ) {}

  @Post()
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
    @Body() payload: SaveMovieDto,
  ): Promise<MovieModelDto> {
    return this.movieProvider.saveOrUpdateMovie(payload);
  }

  @Put(':id')
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
    @Body() payload: SaveMovieDto,
  ): Promise<MovieModelDto> {
    return this.movieProvider.saveOrUpdateMovie(payload, id);
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
  async deleteMovie(
    @Param('id') id: string,
  ): Promise<MovieModelDto> {
    return this.movieProvider.delete(id);
  }
}
