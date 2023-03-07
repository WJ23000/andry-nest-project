import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';

@Entity({
  name: 'Address',
})
export class Address extends Base {
  @PrimaryGeneratedColumn()
  id: string; // 标记为主列，值自动生成

  @Column({
    type: 'varchar',
    length: 255,
    name: 'uid',
    comment: '用户id',
  })
  uid: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'real_name',
    comment: '姓名',
  })
  real_name: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'phone',
    comment: '手机号',
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'province',
    comment: '省份',
  })
  province: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'city',
    comment: '城市',
  })
  city: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    name: 'honorific_title',
    comment: '尊称',
  })
  honorific_title: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
    name: 'type',
    comment: '地址类型',
  })
  type: string;
}
