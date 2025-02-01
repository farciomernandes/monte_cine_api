import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { SaveCategoryDto } from './dtos/save-category.dto';
import { CategoryModelDto } from './dtos/category-model.dto';
import { PaginationDto } from 'src/shared/filter/pagination.dto';
import { CategoryProvider } from './providers/category.provider';
import { SearchParamsDto } from 'src/shared/filter/search-params.dto';

@ApiTags('Category')
@Controller('categories')
@UseInterceptors(CacheInterceptor)
export class CategoryController {
  constructor(
    private readonly categoryProvider: CategoryProvider,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar uma Categoria',
  })
  @ApiBody({
    type: SaveCategoryDto,
    description: 'Payload para criar uma Categoria',
  })
  @ApiOkResponse({
    description: 'Categoria criada com sucesso',
    type: CategoryModelDto,
  })
  @HttpCode(HttpStatus.OK)
  async saveCategory(
    @Body() payload: SaveCategoryDto,
  ): Promise<CategoryModelDto> {
    return this.categoryProvider.saveOrUpdateCategory(payload);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Atualizar uma Categoria',
  })
  @ApiBody({
    type: SaveCategoryDto,
    description: 'Payload para atualizar uma Categoria',
  })
  @ApiOkResponse({
    description: 'Categoria atualizada com sucesso',
    type: CategoryModelDto,
  })
  @HttpCode(HttpStatus.OK)
  async updateCategory(
    @Param('id') id: string,
    @Body() payload: SaveCategoryDto,
  ): Promise<CategoryModelDto> {
    return this.categoryProvider.saveOrUpdateCategory(payload, id);
  }

  @Get()
  @ApiOperation({
    summary: 'Obter todas as Categorias',
  })
  @ApiOkResponse({
    description: 'Retorna todas as Categorias',
    type: PaginationDto<CategoryModelDto>,
  })
  @HttpCode(HttpStatus.OK)
  async getCategories(
    @Query() queryParams: SearchParamsDto,
  ): Promise<PaginationDto<CategoryModelDto>> {
    return this.categoryProvider.findAll(queryParams);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar uma Categoria',
  })
  @ApiOkResponse({
    description: 'Categoria deletada com sucesso',
    type: CategoryModelDto,
  })
  @HttpCode(HttpStatus.OK)
  async deleteCategory(
    @Param('id') id: string,
  ): Promise<CategoryModelDto> {
    return this.categoryProvider.delete(id);
  }
}
