import { Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { InjectDataSource, InjectEntityModel } from '@midwayjs/typeorm';
import { TableEntity } from '../entity/table';
import { EntitySchema, Repository, Table, TableColumn } from 'typeorm';
import { ColumnEntity } from '../entity/column';
import { CustomDataSource } from '../custom.data.source';

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class TableService {
  @InjectEntityModel(TableEntity)
  tableModel: Repository<TableEntity>;
  @InjectEntityModel(ColumnEntity)
  columnModel: Repository<ColumnEntity>;
  @InjectDataSource()
  dataSource: CustomDataSource;

  /**
   * 创建表
   * @param data 
   * @returns 
   */
  async createModel(data) {
    await this.dataSource
      .createQueryRunner()
      .createTable(
        new Table({
          name: data.name,
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
          ],
        })
      );
    await this.tableModel.save(data);
    await this.buildMetadatas();
  }

  /**
   * 创建表字段
   * @param data
   */
  async createColumn(data) {

    const model = await this.tableModel.findOne({
      where: {
        id: data.modelId
      }
    });

    if (!model) return;

    await this.dataSource
      .createQueryRunner()
      .addColumn(
        model.name,
        new TableColumn(
          { name: data.name, type: data.type }
        )
      );

    await this.columnModel.save(data);
    await this.buildMetadatas();
  }

  /**
   * 获取所有模型和列
   */
  async getModelList() {
    return await this.tableModel
      .createQueryBuilder('t')
      .leftJoinAndMapMany('t.children', ColumnEntity, 'c', 't.id = c.modelId')
      .getMany();
  }

  /**
   * 动态创建模型
   */
  async buildMetadatas() {
    const data = await this.tableModel
      .createQueryBuilder('t')
      .innerJoinAndMapMany('t.columns', ColumnEntity, 'c', 't.id = c.modelId')
      .getMany();


    const schemas = data.map((cur: any) => {
      return new EntitySchema({
        name: cur.name,
        tableName: cur.name,
        columns: {
          id: {
            name: 'id',
            primary: true,
            type: 'int',
            generated: 'increment',
          },
          ...(cur.columns || []).reduce((p, c) => {
            return {
              ...p,
              [c.name]: {
                type: 'varchar',
                name: c.name
              }
            }
          }, {}),
        }
      })
    });

    await this.dataSource
      .setOptions({
        entities: [
          TableEntity,
          ColumnEntity,
          ...schemas
        ],
      })
      .buildMetadatas();
  }
}
