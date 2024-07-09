import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly axiosAdapter: AxiosAdapter
  ) {

  }

  async executeSeed() {

    const data = await  this.axiosAdapter.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=650");
    await this.pokemonModel.deleteMany(); 
    const pokemonToInsert: {name: string, no: number}[] = []; 
    data.results.forEach(async ({ name, url }) => {

      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      pokemonToInsert.push({ no, name });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';
  }

 /* async executeSeed() {
    const { data } = await axios.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=10");
    const promiseArray = [];

    await this.pokemonModel.deleteMany();

    data.results.forEach(async ({ name, url }) => {

      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      promiseArray.push(this.pokemonModel.create({ no, name }));
    });

    await Promise.all(promiseArray);

    return 'Seed executed';
  }*/
}
