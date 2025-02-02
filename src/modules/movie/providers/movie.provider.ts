import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/shared/filter/pagination.dto';
import { SearchParamsDto } from 'src/shared/filter/search-params.dto';
import { ISaveMovieUseCase } from '../usecases/save-movie/interfaces/save-movie.interface';
import { IGetMovieUseCase } from '../usecases/get-movie/interfaces/get-movie.interface';
import { IDeleteMovieUseCase } from '../usecases/delete-movie/interfaces/delete-movie.interface';
import { MovieModelDto } from '../dtos/movie-model.dto';
import { SaveMovieDto } from '../dtos/save-movie.dto';
import { Multer } from 'multer';

@Injectable()
export class MovieProvider {
  constructor(
    private readonly saveMovieUseCase: ISaveMovieUseCase,
    private readonly getMovieUseCase: IGetMovieUseCase,
    private readonly deleteMovieUseCase: IDeleteMovieUseCase,
  ) {}

  async saveOrUpdateMovie(
    payload: Omit<SaveMovieDto, 'banner'>,
    banner: Multer.File,
    id?: string,
  ): Promise<MovieModelDto> {
    return this.saveMovieUseCase.execute(payload, banner, id);
  }

  async findAll(
    params: SearchParamsDto,
  ): Promise<PaginationDto<MovieModelDto>> {
    return this.getMovieUseCase.execute(params);
  }

  async delete(id: string): Promise<MovieModelDto> {
    return this.deleteMovieUseCase.execute(id);
  }
}
