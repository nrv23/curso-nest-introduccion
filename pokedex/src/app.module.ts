import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname ,'..','public'), 
    }),
    // conexion a mongodb
    MongooseModule.forRoot("mongodb://localhost:27020/nest-pokemon"),
    PokemonModule
  ]
})
export class AppModule {}
