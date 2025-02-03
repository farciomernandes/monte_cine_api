import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseModelDto } from '@modules/@shared/dtos/base-model.dto';

export class CategoryModelDto extends BaseModelDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Action',
  })
  @IsString()
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  name: string;

  @ApiProperty({
    description: 'The image link of the category',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  image_link: string;
}
