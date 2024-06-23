import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";


export class UpdateCarDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    readonly id?: string; // marcarlo así para darle a entender a ts que es opcional
    //readonly id: string;

    @IsString()
    @IsOptional()
    readonly brand: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    readonly model: string;
}