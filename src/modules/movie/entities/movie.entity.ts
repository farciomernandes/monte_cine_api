import { BaseORMEntity } from '@infra/typeorm/shared/entities/base-orm.entity';
import { Category } from '@modules/category/entities/category.entity';
import { Entity, Column, ManyToMany } from 'typeorm';

@Entity('movie')
export class Movie extends BaseORMEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'int', nullable: false })
  year: number;

  @Column({ type: 'int', nullable: false })
  duration: number;

  @Column({ type: 'varchar', nullable: true })
  link: string;

  @Column({ type: 'varchar', nullable: true })
  banner: string;

  @Column({ type: 'varchar', nullable: true })
  slug: string;

  @Column({ type: 'varchar', nullable: false })
  director: string;

  @Column({ type: 'text', nullable: false })
  country: string;

  @Column({ type: 'text', nullable: true })
  audio: string;

  @Column({ type: 'text', nullable: true })
  writter: string;

  @Column({ type: 'text', nullable: true })
  productor: string;

  @Column({ type: 'text', nullable: true })
  editor: string;

  @Column({ type: 'float', nullable: true })
  rating: number;

  @Column({ type: 'text', nullable: false })
  synopsis: string;

  @Column({ type: 'text', nullable: false })
  cast: string;

  @Column({ type: 'text', nullable: true })
  available_languages: string;

  @Column({ type: 'boolean', nullable: false })
  available_streaming: boolean;

  @ManyToMany(() => Category, (category) => category.movies)
  categories: Category[];
}
