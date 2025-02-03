import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { ISaveCategoryUseCase } from './interfaces/save-category.interface';
import { SaveCategoryDto } from '@modules/category/dtos/save-category.dto';
import { CategoryModelDto } from '@modules/category/dtos/category-model.dto';
import { CategoryRepository } from '@infra/typeorm/repositories/category.respository';
import { S3Storage } from '@infra/aws/S3Storage';
import { PinoLogger } from '@infra/logger/pino.logger';
import { Multer } from 'multer';

@Injectable()
export class SaveCategoryUseCase implements ISaveCategoryUseCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly s3Repository: S3Storage,
    private readonly logger: PinoLogger,
  ) {}

  async execute(
    payload: SaveCategoryDto,
    banner: Multer.File,
    id?: string,
  ): Promise<CategoryModelDto> {
    this.logger.log(`Start save category ${payload.name}`);

    let data = await this.categoryRepository.findOne({
      where: { name: payload.name },
    });

    if (data) {
      throw new BadRequestException(
        `Category with ${payload.name} name already exists!`,
      );
    }

    if (id) {
      data = await this.categoryRepository.findOne({
        where: { id },
      });
    }
    const image_url =
      payload.image_link ?? (await this.s3Repository.saveFile(banner));
    this.logger.log(`Saving category ${payload.name}`);

    return this.categoryRepository.save({
      ...data,
      ...payload,
      image_link: image_url,
    });
  }
}
