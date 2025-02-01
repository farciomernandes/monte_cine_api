import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Movie } from '@modules/movie/entities/movie.entity';

@Injectable()
export class MovieRepository
  extends Repository<Movie>
{
  constructor(
    @InjectDataSource()
    readonly dataSource: DataSource,
  ) {
    super(Movie, dataSource.createEntityManager());
  }
}
