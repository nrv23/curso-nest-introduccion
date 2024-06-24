
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema() // indica que es un esquema de base de datos
export class Pokemon extends Document{ // extiende de documetn para que lea las propiedades de las colecciones
    // y agregue los metodos

    @Prop({
        unique: true,
        index: true,
    })
    name: string;

    @Prop({
        unique: true,
        index: true,
    })
    no: number; // numero de pokemon
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);