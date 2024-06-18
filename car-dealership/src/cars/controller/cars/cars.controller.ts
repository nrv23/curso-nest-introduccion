import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateCarDTO } from 'src/cars/dto/create-car.dto';
import { CarsService } from 'src/cars/service/cars/cars.service';

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
  updateCard(@Param('id', ParseUUIDPipe) id: number, @Body() body) {
  //updateCard(@Param('id', new ParseUUIDPipe({version: '4'})) id: number, @Body() body) {
    return body;
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: number) {
    return {
      message: "Eliminado",
      id
    }
  }
}
