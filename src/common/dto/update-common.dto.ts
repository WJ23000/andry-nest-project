import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './create-common.dto';

export class UpdateCommonDto extends PartialType(LoginDto) {}
