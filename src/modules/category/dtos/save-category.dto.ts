import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SaveCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Action',
  })
  @IsString()
  @IsNotEmpty({ message: 'The field name is required' })
  name: string;

  @ApiProperty({
    description: 'The image link of the category',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  image_link: string;
}