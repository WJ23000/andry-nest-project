import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn()
  id: string | number; // 标记为主列，值自动生成

  @Column({ type: 'varchar', length: 255, name: 'userName', comment: '用户名' })
  userName: string;

  @Column({ type: 'varchar', length: 255, name: 'realName', comment: '姓名' })
  realName: string;

  // select可搭配addSelect('password')使用
  @Column({ type: 'varchar', length: 255, name: 'password', select: false, comment: '密码' })
  password: string;

  @Column({ type: 'varchar', length: 255, name: 'phone', comment: '手机号' })
  phone: string;

  @Column({ type: 'int', name: "age", comment: '年龄' })
  age: number;

  @Column({ type: 'varchar', length: 255, name: 'sex', comment: '性别' })
  sex: string;

  @Column({ type: 'varchar', nullable: true, length: 255, name: 'province', comment: '省份',})
  province: string;

  @Column({ type: 'varchar', nullable: true, length: 255, name: 'city', comment: '城市' })
  city: string;

  @Column({ type: 'timestamp', nullable: true, name: 'createTime', comment: '创建时间' })
  createTime: Date

  @Column({ type: 'timestamp', nullable: true, name: 'updateTime', comment: '更新时间' })
  updateTime: Date
}
