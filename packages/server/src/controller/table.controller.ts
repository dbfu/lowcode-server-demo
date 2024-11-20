import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { TableService } from '../service/table.service';

@Controller('/table')
export class TableController {
  @Inject()
  tableService: TableService;

  @Post('/')
  async createModel(@Body() data) {
    return await this.tableService.createModel(data);
  }

  @Post('/column')
  async createColumn(@Body() data) {
    return await this.tableService.createColumn(data);
  }

  @Get('/')
  async findModel() {
    return await this.tableService.getModelList();
  }
}