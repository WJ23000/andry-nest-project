import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RedisDto {
  @ApiProperty({ description: '关键字' })
  @IsNotEmpty({ message: '关键字不能为空' })
  readonly key: string;

  @ApiProperty({ description: '值' })
  @IsNotEmpty({ message: '值不能为空' })
  readonly value: string;
}
