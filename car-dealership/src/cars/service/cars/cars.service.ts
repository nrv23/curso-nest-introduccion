import { BadRequestException } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDTO, UpdateCarDto } from 'src/cars/dto';
import { ICar } from 'src/cars/interfaces/Car.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CarsService {

    private cards: ICar[] = [
        {
            id: uuid(),
            brand: "Toyota",
            model: "Corona"
        },
        {
            id: uuid(),
            brand: "Honda",
            model: "Civic"
        },
        {
            id: uuid(),
            brand: "Ford",
            model: "Explorer"
        }
    ];

    getAllCars() {
        return this.cards;
    }

    getById(id: string) {
        const card = this.cards.find(car => car.id === id);
        if (!card) throw new NotFoundException("No se encontró un carro con el id " + id);

        return card;
    }

    create(card: CreateCarDTO) {
        const car: ICar = {
            id: uuid(),
            ...card
        };
        this.cards.push(car);

        return car;
    }

    update(id: string, car: UpdateCarDto) {

        let findCar = this.getById(id);

        if (car.id && id !== car.id)
            throw new BadRequestException(`Car id ${car.id} is not valid`);

        this.cards = this.cards.map(el => {
            if (el.id === id) {
                findCar = {
                    ...findCar,
                    ...car,
                    id
                }

                return findCar;
            }

            return {
                ...car,
                id
            };
        });

        return findCar;
    }

    delete(id: string) {

        const exists = this.getById(id);
        if (!exists) throw new NotFoundException(`Car Id ${id} is not exist`);
        this.cards = this.cards.filter(car => car.id !== id);
        return exists;
    }
}
