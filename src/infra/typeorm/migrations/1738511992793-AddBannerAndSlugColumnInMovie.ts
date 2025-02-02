import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddBannerAndSlugColumnInMovie1738511992793
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'movie',
      new TableColumn({
        name: 'banner',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'movie',
      new TableColumn({
        name: 'slug',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('movie', 'banner');
    await queryRunner.dropColumn('movie', 'slug');
  }
}
