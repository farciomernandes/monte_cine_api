import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { MovieModelDto } from '@modules/movie/dtos/movie-model.dto';
import { IGetMovieUseCase } from './interfaces/get-movie.interface';
import { PaginationDto } from 'src/shared/filter/pagination.dto';
import { SearchParamsDto } from 'src/shared/filter/search-params.dto';
import { MovieRepository } from '@infra/typeorm/repositories/movie.respository';

@Injectable()
export class GetMovieUseCase implements IGetMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute({ page, limit }: SearchParamsDto): Promise<PaginationDto<MovieModelDto>> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Page and limit must be greater than zero.');
    }

    const [movies, total] = await this.movieRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      relations: ['categories'],
    });

    const totalPages = Math.ceil(total / limit);

    const data = movies.map(movie => {
      const movieDto = new MovieModelDto();
      movieDto.id = movie.id;
      movieDto.title = movie.title;
      movieDto.year = movie.year;
      movieDto.duration = movie.duration;
      movieDto.link = movie.link;
      movieDto.director = movie.director;
      movieDto.country = movie.country;
      movieDto.audio = movie.audio;
      movieDto.writter = movie.writter;
      movieDto.productor = movie.productor;
      movieDto.editor = movie.editor;
      movieDto.rating = movie.rating;
      movieDto.synopsis = movie.synopsis;
      movieDto.cast = movie.cast;
      movieDto.available_languages = movie.available_languages;
      movieDto.available_streaming = movie.available_streaming;
      movieDto.created_at = movie.created_at;
      movieDto.updated_at = movie.updated_at;
      
      movieDto.categories = movie.categories.map(category => ({
        id: category.id,
        name: category.name,
        image_link: category.image_link,
        created_at: category.created_at,
        updated_at: category.updated_at
      }));

      return movieDto;
    });

    return { data, total, totalPages, currentPage: Number(page), limit: Number(limit) };
  }
}
