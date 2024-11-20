import { Controller, Get } from '@midwayjs/core';
import { InjectDataSource } from '@midwayjs/typeorm';
import { EntitySchema } from 'typeorm';
import { CustomDataSource } from '../custom.data.source';

@Controller('/')
export class HomeController {
  @InjectDataSource()
  dataSource: CustomDataSource;
  @Get('/')
  async home(): Promise<any> {

    // const table = new Table({
    //   name: 'test',
    //   columns: [
    //     {
    //       name: 'id',
    //       type: 'int',
    //       isPrimary: true,
    //       isGenerated: true,
    //       generationStrategy: 'increment',
    //     },
    //     {
    //       name: 'name',
    //       type: 'varchar',
    //     },
    //   ],
    // });

    // await this.dataSource.createQueryRunner().createTable(table);

    const schema = new EntitySchema({
      name: 'test',
      tableName: 'test',
      columns: {
        id: {
          name: 'id',
          primary: true,
          type: 'int',
          generated: 'increment',
        },
        name: {
          name: 'name',
          primary: false,
          type: 'varchar',
        },
      },
    });


    await this.dataSource
      .setOptions({
        entities: [schema],
      })
      .buildMetadatas();
    
    // 插入数据
    await this.dataSource.getRepository(schema).save({ name: 'hello' })
    // 查询数据
    return await this.dataSource.getRepository(schema).find();
  }
}
