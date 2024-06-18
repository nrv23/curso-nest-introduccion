/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CarsController } from './controller/cars/cars.controller';
import { CarsService } from './service/cars/cars.service';
@Module({
  controllers: [CarsController],
  providers: [CarsService]
})
export class CarsModule {}
