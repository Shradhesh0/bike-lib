import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BikeModule } from './bike/bike.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bike } from './bike/entities/bike.entity';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: './bike-library.sqlite',
    entities: [Bike],
    synchronize: true,  // Set to true in development, false in production
  }),
  BikeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
