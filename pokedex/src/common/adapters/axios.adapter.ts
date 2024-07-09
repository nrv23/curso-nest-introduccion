import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from './../interfaces/http-adapter.inrterface';
import { Injectable } from '@nestjs/common';

@Injectable() // se debe usar este decorador para configurar un servicio, adaptador o clase como inyectable
export class AxiosAdapter implements HttpAdapter {

    private axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> { // se le pasa la interfaz de tipo t a la funcion para que retorne la data de la
        // interface generica
        
      try {
        const { data } = await this.axios.get<T>(url);
        return data;
      } catch (error) {
        throw new Error("Check internal logs ");
      }
    }

}