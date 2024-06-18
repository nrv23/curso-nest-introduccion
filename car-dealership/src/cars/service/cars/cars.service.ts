import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDTO } from 'src/cars/dto/create-car.dto';
import { ICar } from 'src/cars/interfaces/Car.interface';
import { v4 as  uuid } from 'uuid';

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
        console.log({id})
        const card = this.cards.find(car => car.id === id );
        console.log({card});
        if(!card) throw new NotFoundException("No se encontró un carro con el id " +id);

        return card;
    }

    create(card: CreateCarDTO) {
        const car :ICar = {
            id: uuid(),
            ...card
        };
        this.cards.push(car);

        return car;
    }
 
}
