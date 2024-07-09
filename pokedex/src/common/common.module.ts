import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
    providers: [
        AxiosAdapter // cuando es un provider ya sea servicio o adaptador se carga en la carpeta provider
    ],
    exports: [
        AxiosAdapter
    ]
})
export class CommonModule {}
