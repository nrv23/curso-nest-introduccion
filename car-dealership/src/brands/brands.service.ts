import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {

  private brands: Array<Brand> = [];

  create(createBrandDto: CreateBrandDto) {

    const newBrand: Brand = {
      id: uuid(),
      name: createBrandDto.name,
      createdAt: new Date().getTime()
    }
    this.brands.push(newBrand);
    return newBrand;

  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {

    const brand = this.brands.find(brand => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let findBrand = this.findOne(id);

    if (updateBrandDto.id && id !== updateBrandDto.id)
      throw new BadRequestException(`Brand id ${findBrand.id} is not valid`);

    this.brands = this.brands.map(brand => {
      if (brand.id === id) {
        findBrand = {
          ...findBrand,
          ...updateBrandDto,
          updatedAt: new Date().getTime(),
          id
        }

        return findBrand;
      }

      return {
        ...brand,
        id
      };
    });

    return findBrand;
  }

  remove(id: string) {
    const brand = this.findOne(id);
    if (!brand) throw new NotFoundException(`Brand Id ${id} is not exist`);
    this.brands = this.brands.filter(el => el.id !== id);
    return brand;
  }
}
