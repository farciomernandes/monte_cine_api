import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export abstract class BaseModelDto {

  @ApiProperty({
    description: 'The ID of the movie',
    example: '9e7b5b16-7423-429e-9d76-3c5c82e5c6b7',
  })
  @IsUUID()
  id: string;


  @ApiProperty({
    description: 'The date when the category was created',
    example: '2024-07-14T16:05:51.755Z',
  })
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty({
    description: 'The date when the category was last updated',
    example: '2024-07-14T16:26:37.893Z',
  })
  @IsNotEmpty()
  updated_at: Date;
}
