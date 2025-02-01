import { CategoryModelDto } from "@modules/category/dtos/category-model.dto";
import { SaveCategoryDto } from "@modules/category/dtos/save-category.dto";

export abstract class ISaveCategoryUseCase {
  abstract execute(
    createCategoryDto: SaveCategoryDto,
    id?: string
  ): Promise<CategoryModelDto>;
}
