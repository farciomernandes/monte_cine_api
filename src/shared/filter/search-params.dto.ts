import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsInt, Min } from 'class-validator';

export class SearchParamsDto {
  @ApiProperty({
    description: 'Número da página atual para a consulta',
    example: 1,
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => (value ? Number(value) : 1))
  page: number = 1;

  @ApiProperty({
    description: 'Número de itens por página',
    example: 10,
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => (value ? Number(value) : 10))
  limit: number = 10;

  @ApiProperty({
    description: 'Slug para pesquisa nos campos relacionados',
    example: 'matriz_2',
    required: false,
  })
  @IsOptional()
  slug: string;

  @ApiProperty({
    description: 'Id da categoria para pesquisa nos campos relacionados',
    example: 'matriz_2',
    required: false,
  })
  @IsOptional()
  category_id: string;

  @ApiProperty({
    description: 'Texto para pesquisa nos campos title e name',
    example: 'ação',
    required: false,
  })
  @IsOptional()
  search: string;
  //
  // @ApiProperty({
  //   description: 'Campo para ordenação, por padrão ordena por "id"',
  //   example: 'name',
  //   required: false,
  // })
  // @IsOptional()
  // sort: string = 'id';
  //
  // @ApiProperty({
  //   description: 'Ordem da ordenação: asc ou desc',
  //   example: 'asc',
  //   required: false,
  // })
  // @IsOptional()
  // order: 'asc' | 'desc' = 'asc';
}
