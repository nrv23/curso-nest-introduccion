import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CarsService } from 'src/cars/service/cars/cars.service';
import { UpdateCarDto, CreateCarDTO } from '../../dto';

@Controller('cars')
// @UsePipes(ValidationPipe) // usar el validation pipe a nivel de controlador
export class CarsController {

  constructor(private readonly cardService: CarsService) { }

  @Get()
  getAllCars() {
    return this.cardService.getAllCars();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string) {
    return this.cardService.getById(id);
  }

  @Post()

  createCard(@Body() dto: CreateCarDTO) { // leer el body

    return this.cardService.create(dto);
  }

  @Put(':id')
  updateCard(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateCarDto) {
    //updateCard(@Param('id', new ParseUUIDPipe({version: '4'})) id: number, @Body() body) {
    return this.cardService.update(id, body);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {

    return this.cardService.delete(id);
  }
}
