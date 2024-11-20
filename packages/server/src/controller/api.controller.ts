import { Controller, Param, Body, Post } from '@midwayjs/core';
import { InjectDataSource } from '@midwayjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('/api')
export class APIController {
  @InjectDataSource()
  dataSource: DataSource;

  /**
   * 查询对应表数据
   */
  @Post('/model/:modelName/get')
  async find(@Param('modelName') modelName, @Body() body) {
    const data = await this.dataSource
      .getRepository(modelName)
      .find(body);
    return data;
  }

  /**
   * 分页查询对应表数据
   */
  @Post('/model/:modelName/page')
  async page(@Param('modelName') modelName, @Body() body) {
    const [data, total] = await this.dataSource
      .getRepository(modelName)
      .findAndCount({
        skip: (body.page || 0) * (body.size || 10),
        take: body.size || 10
      });
    return {
      data,
      total,
    };
  }

  /**
   * 创建数据
   */
  @Post('/model/:modelName/create')
  async create(@Param('modelName') modelName, @Body() body) {
    const data = await this.dataSource
      .getRepository(modelName)
      .save(body);
    return data;
  }

  /**
   * 更新数据
   */
  @Post('/model/:modelName/update')
  async update(@Param('modelName') modelName, @Body() body) {
    const data = await this.dataSource
      .getRepository(modelName)
      .save(body);
    return data;
  }

  /**
   * 删除数据
   */
  @Post('/model/:modelName/delete')
  async delete(@Param('modelName') modelName, @Body() body) {
    const data = await this.dataSource
      .getRepository(modelName)
      .delete(body.id);
    return data;
  }
}
