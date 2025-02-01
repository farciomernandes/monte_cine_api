import { CategoryModelDto } from "@modules/category/dtos/category-model.dto";

export abstract class IDeleteCategoryUseCase {
  abstract execute(id: string): Promise<CategoryModelDto>;
}
