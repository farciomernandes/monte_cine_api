import { MovieModelDto } from "@modules/movie/dtos/movie-model.dto";

export abstract class IDeleteMovieUseCase {
  abstract execute(id: string): Promise<MovieModelDto>;
}
