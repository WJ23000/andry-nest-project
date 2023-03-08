import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Pagination {
  @ApiProperty({
    title: '当前页码',
    description: '当前页码',
    default: 1,
  })
  @IsNotEmpty({ message: '当前页码不能为空' })
  readonly current: number;

  @ApiProperty({
    title: '当前页数',
    description: '当前页数',
    default: 10,
  })
  @IsNotEmpty({ message: '当前页数不能为空' })
  readonly size: number;
}

export class CreateDateTime {
  @ApiPropertyOptional({
    title: '创建时间',
    description: '创建时间',
  })
  readonly create_time: Date;

  @ApiPropertyOptional({
    title: '更新时间',
    description: '更新时间',
  })
  readonly update_time: Date;
}
