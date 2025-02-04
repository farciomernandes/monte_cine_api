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
import { PinoLogger } from '@infra/logger/pino.logger';
import { createSlug } from 'src/shared/utils/utils';

@Injectable()
export class SaveMovieUseCase implements ISaveMovieUseCase {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly s3Repository: S3Storage,
    private readonly logger: PinoLogger,
  ) {}

  async execute(
    payload: SaveMovieDto,
    banner: Multer.File,
    id?: string,
  ): Promise<MovieModelDto> {
    this.logger.log(`Start save movie ${payload.title}`);

    let movie = await this.movieRepository.findOne({
      where: { title: payload.title },
      relations: ['categories'],
    });

    if (movie && !id) {
      this.logger.error(`Movie with payload ${payload.title} with error`);
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

    if (payload.categories) {
      const categoryIds: string[] = [];
      if (Array.isArray(payload.categories)) {
        const categories =
          typeof payload.categories === 'string'
            ? JSON.parse(payload.categories)
            : payload.categories;
        categories.forEach((category) => categoryIds.push(category.id));
      } else {
        const parsedCategories =
          typeof payload.categories === 'string'
            ? JSON.parse(payload.categories)
            : payload.categories;
        categoryIds.push(parsedCategories.id);
      }

      const categories = await this.categoryRepository.findBy({
        id: In(categoryIds),
      });

      movie.categories = categories;
      payload.categories = categories;
    }

    const image_url = await this.s3Repository.saveFile(banner);

    const movieData = {
      ...movie,
      ...payload,
      banner: image_url,
      slug: payload.slug ?? createSlug(payload.title),
    };
    this.logger.log(`Saving movie ${payload.title}`);

    return this.movieRepository.save(movieData);
  }
}
