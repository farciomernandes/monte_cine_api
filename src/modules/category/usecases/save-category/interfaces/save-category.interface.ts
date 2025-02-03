import { CategoryModelDto } from '@modules/category/dtos/category-model.dto';
import { SaveCategoryDto } from '@modules/category/dtos/save-category.dto';
import { Multer } from 'multer';

export abstract class ISaveCategoryUseCase {
  abstract execute(
    createCategoryDto: Omit<SaveCategoryDto, 'banner'>,
    banner: Multer.File,
    id?: string,
  ): Promise<CategoryModelDto>;
}
