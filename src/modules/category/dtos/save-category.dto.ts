import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SaveCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Action',
  })
  @IsString()
  @IsNotEmpty({ message: 'The field name is required' })
  name: string;

  image_link: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file',
  })
  @IsString()
  @IsOptional()
  banner: string;
}
