import { BaseORMEntity } from '@infra/typeorm/shared/entities/base-orm.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Movie } from '@modules/movie/entities/movie.entity';

@Entity('categories')
export class Category extends BaseORMEntity {
  @Column({ type: 'varchar', nullable: true })
  @IsString()
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  image_link: string;

  @ManyToMany(() => Movie, (movie) => movie.categories)
  @JoinTable({
    name: 'category_movie',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
  })
  movies: Movie[];
}
