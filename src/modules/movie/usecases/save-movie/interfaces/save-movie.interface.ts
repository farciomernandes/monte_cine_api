import { MovieModelDto } from '@modules/movie/dtos/movie-model.dto';
import { SaveMovieDto } from '@modules/movie/dtos/save-movie.dto';
import { Multer } from 'multer';

export abstract class ISaveMovieUseCase {
  abstract execute(
    createMovieDto: Omit<SaveMovieDto, 'banner'>,
    banner: Multer.File,
    id?: string,
  ): Promise<MovieModelDto>;
}
