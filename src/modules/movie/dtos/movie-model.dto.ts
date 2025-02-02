import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNumber,
} from 'class-validator';
import { CategoryModelDto } from '@modules/category/dtos/category-model.dto';
import { BaseModelDto } from '@modules/@shared/dtos/base-model.dto';

export class MovieModelDto extends BaseModelDto {
  @ApiProperty({
    description: 'The title of the movie',
    example: 'Inception',
  })
  @IsString()
  @IsNotEmpty({ message: 'O campo título é obrigatório' })
  title: string;

  @ApiProperty({
    description: 'The release year of the movie',
    example: 2010,
  })
  @IsInt()
  @IsNotEmpty({ message: 'O campo ano é obrigatório' })
  year: number;

  @ApiProperty({
    description: 'The duration of the movie in minutes',
    example: 148,
  })
  @IsInt()
  @IsNotEmpty({ message: 'O campo duração é obrigatório' })
  duration: number;

  @ApiProperty({
    description: 'The link to the movie trailer or promotional material',
    example: 'https://example.com/trailer.mp4',
    required: false,
  })
  @IsOptional()
  @IsString()
  link: string;

  @ApiProperty({
    type: 'string',
    description: 'Image file',
  })
  @IsString()
  @IsOptional()
  banner: string;

  @ApiProperty({
    description: 'The slug of the movie',
    example: 'inception_two',
  })
  @IsString()
  @IsNotEmpty({ message: 'O campo slug é obrigatório' })
  slug: string;

  @ApiProperty({
    description: 'The director of the movie',
    example: 'Christopher Nolan',
  })
  @IsString()
  @IsNotEmpty({ message: 'O campo diretor é obrigatório' })
  director: string;

  @ApiProperty({
    description: 'The country where the movie was produced',
    example: 'USA',
  })
  @IsString()
  @IsNotEmpty({ message: 'O campo país é obrigatório' })
  country: string;

  @ApiProperty({
    description: 'The audio languages of the movie',
    example: 'English, Spanish',
    required: false,
  })
  @IsOptional()
  @IsString()
  audio: string;

  @ApiProperty({
    description: 'The writer of the movie',
    example: 'Jonathan Nolan',
    required: false,
  })
  @IsOptional()
  @IsString()
  writter: string;

  @ApiProperty({
    description: 'The producer of the movie',
    example: 'Emma Thomas',
    required: false,
  })
  @IsOptional()
  @IsString()
  productor: string;

  @ApiProperty({
    description: 'The editor of the movie',
    example: 'Lee Smith',
    required: false,
  })
  @IsOptional()
  @IsString()
  editor: string;

  @ApiProperty({
    description: 'The rating of the movie',
    example: 8.8,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  rating: number;

  @ApiProperty({
    description: 'A brief synopsis of the movie',
    example:
      'A thief who steals corporate secrets through the use of dream-sharing technology...',
  })
  @IsString()
  @IsNotEmpty({ message: 'O campo sinopse é obrigatório' })
  synopsis: string;

  @ApiProperty({
    description: 'The available languages for the movie',
    example: 'English, Spanish, French',
    required: false,
  })
  @IsOptional()
  @IsString()
  available_languages: string;

  @ApiProperty({
    description: 'The casts',
    example: 'Jack Chan, Will Smith',
    required: false,
  })
  @IsOptional()
  @IsString()
  cast: string;

  @ApiProperty({
    description: 'Indicates if the movie is available for streaming',
    example: true,
  })
  @IsBoolean()
  available_streaming: boolean;

  @ApiProperty({
    description: 'List of categories associated with the movie',
    type: [CategoryModelDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  categories: CategoryModelDto[];
}
