import { MovieRepository } from "@infra/typeorm/repositories/movie.respository";
import { Module } from "@nestjs/common";
import { ISaveMovieUseCase } from "./usecases/save-movie/interfaces/save-movie.interface";
import { SaveMovieUseCase } from "./usecases/save-movie/save-movie.usecase";
import { GetMovieUseCase } from "./usecases/get-movie/get-movie.usecase";
import { IGetMovieUseCase } from "./usecases/get-movie/interfaces/get-movie.interface";
import { IDeleteMovieUseCase } from "./usecases/delete-movie/interfaces/delete-movie.interface";
import { DeleteMovieUseCase } from "./usecases/delete-movie/delete-movie.usecase";
import { MovieProvider } from "./providers/movie.provider";
import { CategoryModule } from "@modules/category/category.module";
import { CategoryRepository } from "@infra/typeorm/repositories/category.respository";
import { MovieController } from "./movie.controller";



@Module({
  imports: [CategoryModule],
  providers: [
    MovieRepository,
    CategoryRepository,
    {
      provide: ISaveMovieUseCase,
      useFactory: (
        movieRepository: MovieRepository,
        categoryRepository: CategoryRepository
      ) => {
        return new SaveMovieUseCase(
          movieRepository,
          categoryRepository,
        );
      },
      inject: [MovieRepository, CategoryRepository],
    },
    {
      provide: IGetMovieUseCase,
      useFactory: (
        movieRepository: MovieRepository,
      ) => {
        return new GetMovieUseCase(
          movieRepository,
        );
      },
      inject: [MovieRepository],
    },
    {
      provide: IDeleteMovieUseCase,
      useFactory: (
        movieRepository: MovieRepository,
      ) => {
        return new DeleteMovieUseCase(
          movieRepository,
        );
      },
      inject: [MovieRepository],
    },
    {
      provide: MovieProvider,
      useFactory: (
        saveMovieUseCase: ISaveMovieUseCase,
        getMovieUseCase: IGetMovieUseCase,
        deleteMovieUseCase: IDeleteMovieUseCase,
      ) => {
        return new MovieProvider(
          saveMovieUseCase,
          getMovieUseCase,
          deleteMovieUseCase,
        );
      },
      inject: [
        ISaveMovieUseCase,
        IGetMovieUseCase,
        IDeleteMovieUseCase,
      ],
    },
  ],
  controllers: [MovieController],
})
export class MovieModule {}
