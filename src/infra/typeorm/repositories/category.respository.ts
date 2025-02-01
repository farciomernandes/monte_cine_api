import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Category } from '@modules/category/entities/category.entity';

@Injectable()
export class CategoryRepository
  extends Repository<Category>
{
  constructor(
    @InjectDataSource()
    readonly dataSource: DataSource,
  ) {
    super(Category, dataSource.createEntityManager());
  }
}
