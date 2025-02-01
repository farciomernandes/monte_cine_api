import { MovieModelDto } from "@modules/movie/dtos/movie-model.dto";
import { PaginationDto } from "src/shared/filter/pagination.dto";
import { SearchParamsDto } from "src/shared/filter/search-params.dto";

export abstract class IGetMovieUseCase {
  abstract execute(params: SearchParamsDto): Promise<PaginationDto<MovieModelDto>>;
}
