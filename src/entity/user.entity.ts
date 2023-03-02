import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcryptjs from 'bcryptjs';

@Entity({
  name: 'User',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string; // 标记为主列，值自动生成

  @Column({
    type: 'varchar',
    length: 255,
    name: 'user_name',
    comment: '用户名',
  })
  user_name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    name: 'real_name',
    comment: '姓名',
  })
  real_name: string;

  @Exclude() // 排除password
  @Column({
    type: 'varchar',
    length: 255,
    name: 'password',
    comment: '密码',
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    name: 'phone',
    comment: '手机号',
  })
  phone: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    name: 'avatar',
    comment: '头像',
  })
  avatar: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    name: 'email',
    comment: '电子邮箱',
  })
  email: string;

  @Column({
    type: 'int',
    nullable: true,
    name: 'age',
    comment: '年龄',
  })
  age: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    name: 'sex',
    comment: '性别',
  })
  sex: string;

  @Column({
    type: 'int',
    nullable: true,
    name: 'role',
    comment: '角色',
  })
  role: number;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    name: 'province',
    comment: '省份',
  })
  province: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    name: 'city',
    comment: '城市',
  })
  city: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'create_time',
    comment: '创建时间',
  })
  create_time: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'update_time',
    comment: '更新时间',
  })
  update_time: Date;

  // 提前对密码进行加密
  @BeforeInsert()
  async bcryptPwd() {
    this.password = await bcryptjs.hashSync(this.password);
  }
}
