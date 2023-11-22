import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsResolver } from './cars.resolver';

@Module({
  providers: [CarsService, CarsResolver]
})
export class CarsModule {}
