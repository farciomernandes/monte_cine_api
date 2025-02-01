import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto<T> {
  @ApiProperty({
    description: 'A list of items in the current page',
    type: [Object],
  })
  data: T[];

  @ApiProperty({
    description: 'The total number of items available',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'The total number of pages based on the total items and the limit',
    example: 10,
  })
  totalPages: number;

  @ApiProperty({
    description: 'The current page number',
    example: 1,
  })
  currentPage: number;

  @ApiProperty({
    description: 'The number of items per page',
    example: 10,
  })
  limit: number;

  constructor(data: T[], total: number, totalPages: number, currentPage: number, limit: number) {
    this.data = data;
    this.total = total;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.limit = limit;
  }
}
