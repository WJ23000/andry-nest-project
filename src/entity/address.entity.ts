import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({
  name: 'Address',
})
export class Address extends BaseEntity {
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
}
