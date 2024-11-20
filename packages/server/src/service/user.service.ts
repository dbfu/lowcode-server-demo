import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserEntity } from '../entity/user';
import { Repository } from 'typeorm';

@Provide()
export class UserService {

  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  /**
   * 查询所有用户
   * @returns all user
   */
  async list() {
    return await this.userModel.find();
  }

  /**
   * 分页查询用户
   * @param page
   * @param size
   * @returns page user
   */
  async page(page: number = 0, size: number = 10) {
    const [data, total] = await this.userModel.findAndCount({
      skip: page * size,
      take: size
    });

    return {
      data,
      total
    }
  }

  /**
   * 新增用户
   * @param user
   * @returns
   */
  async create(user: UserEntity) {
    return await this.userModel.save(user);
  }

  /**
   * 根据id删除用户
   * @param id
   * @returns
   */

  async delete(id: number) {
    return await this.userModel.delete(id);
  }

  /**
   * 更新用户
   * @param user
   * @returns
   */
  async update(user: UserEntity) {
    return await this.userModel.save(user);
  }

  /**
   * 根据id查询用户
   * @param id
   * @returns
   */

  async findById(id: number) {
    return await this.userModel.findOne({ where: { id } });
  }
}
