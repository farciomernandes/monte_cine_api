import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { ISaveCategoryUseCase } from './interfaces/save-category.interface';
import { SaveCategoryDto } from '@modules/category/dtos/save-category.dto';
import { CategoryModelDto } from '@modules/category/dtos/category-model.dto';
import { CategoryRepository } from '@infra/typeorm/repositories/category.respository';

@Injectable()
export class SaveCategoryUseCase implements ISaveCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(payload: SaveCategoryDto, id?: string): Promise<CategoryModelDto> {
    let data = await this.categoryRepository.findOne({
      where: { name: payload.name },
    });
    
    if (data) {
      throw new BadRequestException(
        `Category with ${payload.name} name already exists!`,
      );
    }

    if(id) {
      data = await this.categoryRepository.findOne({
        where: { id },
      });
    }

    return this.categoryRepository.save({
      ...data,
      ...payload,
    });
  }
}
