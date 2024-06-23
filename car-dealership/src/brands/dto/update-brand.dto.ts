
/*import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}*/

import { IsString, IsUUID, MinLength } from "class-validator";

export class UpdateBrandDto {

    @IsString()
    @IsUUID()
    id: string

    @IsString()
    @MinLength(5)
    name: string;
}