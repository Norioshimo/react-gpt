import { IsInt, IsOptional, IsString } from "class-validator";

export class Orthography {

    @IsString({message:'prompt es requerido'})
    readonly prompt: string;

    @IsInt()
    @IsOptional()
    readonly maxTokens?: number;
}

