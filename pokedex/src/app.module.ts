import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './config/env.config';
import { JoiValidationSchema } from './config/joi.validation';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        EnvConfig // carga el archivo con la configuracion por defecto para las variables de ambiente
      ],
      // usar un esquema de validacion
      validationSchema: JoiValidationSchema
    }), // como es configuracion de variables de entorno debe colocarse primero
    ServeStaticModule.forRoot({
      rootPath: join(__dirname ,'..','public'), 
    }),
    // conexion a mongodb
    MongooseModule.forRoot(process.env.MONGODB,{
      dbName: "pokemonDB"
    }),
    PokemonModule,
    CommonModule,
    SeedModule,
  ]
})
export class AppModule {

}
