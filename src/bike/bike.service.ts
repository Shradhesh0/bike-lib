import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from './entities/bike.entity';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';

import { v4 as uuidv4 } from 'uuid';

// export interface Bike {
//   id: string;      // UUID
//   make: string;    // e.g., "Royal Enfield"
//   model: string;   // e.g., "Classic 350"
//   year: number;    // e.g., 2021
//   type: string;    // e.g., "Cruiser", "Sport"
// }


@Injectable()
export class BikeService {
  // private bikes: Bike[] = [];
  constructor(
    @InjectRepository(Bike)
    private bikeRepository: Repository<Bike>,
  ) {}

  async findAll(): Promise<Bike[]> {
    return await this.bikeRepository.find();
  }

  async create(createBikeDto: CreateBikeDto): Promise<Bike> {
    const bike = this.bikeRepository.create(createBikeDto);  // Create new Bike instance
    return await this.bikeRepository.save(bike);  // Save to database
  }

  async update(id: string, updateBikeDto: Partial<CreateBikeDto>): Promise<Bike> {
    const bike = await this.bikeRepository.findOneBy({ id });
    if (!bike) {
      throw new Error(`Bike with id ${id} not found`);
    }
    Object.assign(bike, updateBikeDto);
    return this.bikeRepository.save(bike);  // Save updated bike
  }

  async remove(id: string): Promise<void> {
    const result = await this.bikeRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Bike with id ${id} not found`);
    }
  }
}