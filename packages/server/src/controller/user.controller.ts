import { Body, Controller, Del, Get, Inject, Param, Post, Put, Query } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/user')
export class ModelController {
  @Inject()
  userService: UserService;

  /**
   * 获取所有用户
   */
  @Get("/list")
  async list() {
    return await this.userService.list();
  }

  /**
   * 分页获取用户
   */
  @Get("/page")
  async page(@Query() query) {
    return await this.userService.page(query.page, query.size);
  }

  /**
   * 新增用户
   */
  @Post('/')
  async create(@Body() body) {
    return await this.userService.create(body);
  }

  /**
   * 更新用户
   */
  @Put('/')
  async update(@Body() body) {
    return await this.userService.update(body);
  }

  /**
   * 删除用户
   */
  @Del('/:id')
  async remove(@Param('id') id) {
    return await this.userService.delete(id);
  }
}