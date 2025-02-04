import { PaginationDto } from 'src/shared/filter/pagination.dto';
import { SearchParamsDto } from 'src/shared/filter/search-params.dto';
import { CategoryModelDto } from '@modules/category/dtos/category-model.dto';

export abstract class IGetCategoryUseCase {
  abstract execute(
    params: SearchParamsDto,
  ): Promise<PaginationDto<CategoryModelDto>>;
}
