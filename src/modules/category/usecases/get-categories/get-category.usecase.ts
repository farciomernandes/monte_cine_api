import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { CategoryModelDto } from '@modules/category/dtos/category-model.dto';
import { IGetCategoryUseCase } from './interfaces/get-category.interface';
import { PaginationDto } from 'src/shared/filter/pagination.dto';
import { SearchParamsDto } from 'src/shared/filter/search-params.dto';
import { CategoryRepository } from '@infra/typeorm/repositories/category.respository';

@Injectable()
export class GetCategoryUseCase implements IGetCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute({
    page = 1,
    limit = 20,
  }: SearchParamsDto): Promise<PaginationDto<CategoryModelDto>> {
    if (page < 1 || limit < 1 || !page || !limit) {
      throw new BadRequestException(
        'Page and limit must be greater than zero.',
      );
    }

    const [categories, total] = await this.categoryRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);

    const data = categories.map((category) => {
      const categoryDto = new CategoryModelDto();
      categoryDto.id = category.id;
      categoryDto.name = category.name;
      categoryDto.image_link = category.image_link;
      categoryDto.created_at = category.created_at;
      categoryDto.updated_at = category.updated_at;
      return categoryDto;
    });

    return {
      data,
      total,
      totalPages,
      currentPage: Number(page),
      limit: Number(limit),
    };
  }
}
