import { CategoryRepository } from '@infra/typeorm/repositories/category.respository';
import { Module } from '@nestjs/common';
import { ISaveCategoryUseCase } from './usecases/save-category/interfaces/save-category.interface';
import { SaveCategoryUseCase } from './usecases/save-category/save-category.usecase';
import { CategoryProvider } from './providers/category.provider';
import { CategoryController } from './category.controller';
import { IGetCategoryUseCase } from './usecases/get-categories/interfaces/get-category.interface';
import { GetCategoryUseCase } from './usecases/get-categories/get-category.usecase';
import { IDeleteCategoryUseCase } from './usecases/delete-category/interfaces/delete-category.interface';
import { DeleteCategoryUseCase } from './usecases/delete-category/delete-category.usecase';
import { S3Storage } from '@infra/aws/S3Storage';
import { PinoLogger } from '@infra/logger/pino.logger';

@Module({
  imports: [],
  providers: [
    CategoryRepository,
    S3Storage,
    PinoLogger,
    {
      provide: ISaveCategoryUseCase,
      useFactory: (
        categoryRepository: CategoryRepository,
        s3Storage: S3Storage,
        logger: PinoLogger,
      ) => {
        return new SaveCategoryUseCase(categoryRepository, s3Storage, logger);
      },
      inject: [CategoryRepository, S3Storage, PinoLogger],
    },
    {
      provide: IGetCategoryUseCase,
      useFactory: (categoryRepository: CategoryRepository) => {
        return new GetCategoryUseCase(categoryRepository);
      },
      inject: [CategoryRepository],
    },
    {
      provide: IDeleteCategoryUseCase,
      useFactory: (categoryRepository: CategoryRepository) => {
        return new DeleteCategoryUseCase(categoryRepository);
      },
      inject: [CategoryRepository],
    },
    {
      provide: CategoryProvider,
      useFactory: (
        saveCategoryUseCase: ISaveCategoryUseCase,
        getCategoryUseCase: IGetCategoryUseCase,
        deleteCategoryUseCase: IDeleteCategoryUseCase,
      ) => {
        return new CategoryProvider(
          saveCategoryUseCase,
          getCategoryUseCase,
          deleteCategoryUseCase,
        );
      },
      inject: [
        ISaveCategoryUseCase,
        IGetCategoryUseCase,
        IDeleteCategoryUseCase,
      ],
    },
  ],
  controllers: [CategoryController],
  exports: [CategoryRepository],
})
export class CategoryModule {}
