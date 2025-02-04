import { Injectable, NotFoundException } from '@nestjs/common';
import { IDeleteCategoryUseCase } from './interfaces/delete-category.interface';
import { CategoryModelDto } from '@modules/category/dtos/category-model.dto';
import { CategoryRepository } from '@infra/typeorm/repositories/category.respository';

@Injectable()
export class DeleteCategoryUseCase implements IDeleteCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: string): Promise<CategoryModelDto> {
    const alreadyExists = await this.categoryRepository.findOneBy({ id });

    if (!alreadyExists) {
      throw new NotFoundException(`Category with ${id} id not found!`);
    }

    await this.categoryRepository.remove(alreadyExists);

    return alreadyExists;
  }
}
