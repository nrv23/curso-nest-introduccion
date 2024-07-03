import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  
  async executeSeed() {
    const { data } = await axios.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=69");

    data.results.forEach(({name, url}) => {
  
      const segments = url.split('/');
      const noPokemon: number = +segments[segments.length - 2];
    })
    return data;
  }
}
