import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { ISaveMovieUseCase } from './interfaces/save-movie.interface';
import { SaveMovieDto } from '@modules/movie/dtos/save-movie.dto';
import { MovieModelDto } from '@modules/movie/dtos/movie-model.dto';
import { MovieRepository } from '@infra/typeorm/repositories/movie.respository';
import { CategoryRepository } from '@infra/typeorm/repositories/category.respository';
import { Movie } from '@modules/movie/entities/movie.entity';
import { In } from 'typeorm';
import { S3Storage } from '@infra/aws/S3Storage';
import { Multer } from 'multer';

@Injectable()
export class SaveMovieUseCase implements ISaveMovieUseCase {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly s3Repository: S3Storage,
  ) {}

  async execute(
    payload: SaveMovieDto,
    banner: Multer.File,
    id?: string,
  ): Promise<MovieModelDto> {
    let movie = await this.movieRepository.findOne({
      where: { title: payload.title },
      relations: ['categories'],
    });

    if (movie && !id) {
      throw new BadRequestException(
        `Movie with title ${payload.title} already exists!`,
      );
    }

    if (id) {
      movie = await this.movieRepository.findOne({
        where: { id },
        relations: ['categories'],
      });

      if (!movie) {
        throw new BadRequestException(`Movie with id ${id} not found!`);
      }
    }

    if (!movie) {
      movie = new Movie();
    }

    if (payload.categories && payload.categories.length > 0) {
      const categories = await this.categoryRepository.findBy({
        id: In(payload.categories.map((category) => category.id)),
      });

      if (categories.length !== payload.categories.length) {
        throw new BadRequestException('One or more categories not found!');
      }

      movie.categories = categories;
    }
    const image_url = await this.s3Repository.saveFile(banner);

    const movieData = { ...movie, ...payload, banner: image_url };

    return this.movieRepository.save(movieData);
  }
}
