import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableAndFkCategoryAndMovie1738248044488 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'categories',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'image_link',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                        isNullable: false,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                        isNullable: false,
                    },
                ],
            }),
            true
        );

        await queryRunner.createTable(
            new Table({
                name: 'movie',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'year',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'duration',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'link',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'director',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'country',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'audio',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'writter',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'productor',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'editor',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'rating',
                        type: 'float',
                        isNullable: true,
                    },
                    {
                        name: 'synopsis',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'cast',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'available_languages',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'available_streaming',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                        isNullable: false,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                        isNullable: false,
                    },
                ],
            }),
            true
        );

        await queryRunner.createTable(
            new Table({
                name: 'category_movie',
                columns: [
                    {
                        name: 'category_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'movie_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        default: 'now()',
                        isNullable: false,
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            'category_movie',
            new TableForeignKey({
                columnNames: ['category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categories',
                onDelete: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'category_movie',
            new TableForeignKey({
                columnNames: ['movie_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'movie',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('category_movie', 'FK_category_id');
        await queryRunner.dropForeignKey('category_movie', 'FK_movie_id');

        await queryRunner.dropTable('category_movie');
        await queryRunner.dropTable('movie');
        await queryRunner.dropTable('categories');
    }
}
