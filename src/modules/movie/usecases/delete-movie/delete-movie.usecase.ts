import { Injectable, NotFoundException } from '@nestjs/common';
import { IDeleteMovieUseCase } from './interfaces/delete-movie.interface';
import { MovieRepository } from '@infra/typeorm/repositories/movie.respository';
import { MovieModelDto } from '@modules/movie/dtos/movie-model.dto';

@Injectable()
export class DeleteMovieUseCase implements IDeleteMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string): Promise<MovieModelDto> {
    const alreadyExists = await this.movieRepository.findOneBy({ id });

    if (!alreadyExists) {
      throw new NotFoundException(`Movie with ${id} id not found!`);
    }

    await this.movieRepository.remove(alreadyExists);

    return alreadyExists;
  }
}
