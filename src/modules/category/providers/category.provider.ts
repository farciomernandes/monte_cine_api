import { Injectable } from '@nestjs/common';
import { ISaveCategoryUseCase } from '../usecases/save-category/interfaces/save-category.interface';
import { SaveCategoryDto } from '../dtos/save-category.dto';
import { CategoryModelDto } from '../dtos/category-model.dto';
import { IGetCategoryUseCase } from '../usecases/get-categories/interfaces/get-category.interface';
import { PaginationDto } from 'src/shared/filter/pagination.dto';
import { IDeleteCategoryUseCase } from '../usecases/delete-category/interfaces/delete-category.interface';
import { SearchParamsDto } from 'src/shared/filter/search-params.dto';
import { Multer } from 'multer';

@Injectable()
export class CategoryProvider {
  constructor(
    private readonly saveCategoryUseCase: ISaveCategoryUseCase,
    private readonly getCategoryUseCase: IGetCategoryUseCase,
    private readonly deleteCategoryUseCase: IDeleteCategoryUseCase,
  ) {}

  async saveOrUpdateCategory(
    payload: Omit<SaveCategoryDto, 'banner'>,
    banner: Multer.File,
    id?: string,
  ): Promise<CategoryModelDto> {
    return this.saveCategoryUseCase.execute(payload, banner, id);
  }

  async findAll(
    params: SearchParamsDto,
  ): Promise<PaginationDto<CategoryModelDto>> {
    return this.getCategoryUseCase.execute(params);
  }

  async delete(id: string): Promise<CategoryModelDto> {
    return this.deleteCategoryUseCase.execute(id);
  }
}
