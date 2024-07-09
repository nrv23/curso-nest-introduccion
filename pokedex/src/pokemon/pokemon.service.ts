import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';



@Injectable()
export class PokemonService {

  // Model<Pokemon> debe ser un tipo model que es generico con el tipo de coleccion que es un entidad

  constructor(
    @InjectModel(Pokemon.name) // ese decorador indica que se va usar la inyeccion de depdencia
    private readonly pokemonModel: Model<Pokemon>
  ) {

  }

  async create(createPokemonDto: CreatePokemonDto) {

    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      // buscar como usar los hooks de mongodb en nest
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    return this.pokemonModel.find()
      .limit(paginationDto.limit || 10)
      .skip(paginationDto.offset || 0)
      .sort({
        no: 1
      })
      .select('-__v');
  }

  async findOne(query: string) {

    let pokemon: Pokemon = null;

    if (!isNaN(+query)) { // es un numero
      pokemon = await this.pokemonModel.findOne({ no: query });
    }
    else if (!pokemon && isValidObjectId(query)) {
      pokemon = await this.pokemonModel.findById(query);
    } else {
      pokemon = await this.pokemonModel.findOne({
        name: query
      });
    }

    if (!pokemon) throw new NotFoundException("Pokemon not exists");

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    try {
      const pokemon = await this.findOne(term);
      await pokemon.updateOne(updatePokemonDto);
      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto
      };
    } catch (error) {
      console.log(error.response.statusCode)
      this.handleExceptions(error);
    }
  }


  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new NotFoundException(`there is not pokemon with id ${id}`);
    return;
  }

  handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon already exist`);
    }

    throw new InternalServerErrorException("Internal Server Error");
  }
}
