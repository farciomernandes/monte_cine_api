import { MovieModelDto } from "@modules/movie/dtos/movie-model.dto";
import { SaveMovieDto } from "@modules/movie/dtos/save-movie.dto";

export abstract class ISaveMovieUseCase {
  abstract execute(
    createMovieDto: SaveMovieDto,
    id?: string
  ): Promise<MovieModelDto>;
}
