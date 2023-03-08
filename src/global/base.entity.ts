import { Column, Entity, BaseEntity } from 'typeorm';

@Entity({
  name: 'Base',
})
export class Base extends BaseEntity {
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
