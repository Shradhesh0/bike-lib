import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BikeService  } from './bike.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { Bike } from './entities/bike.entity';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('bike')
@Controller('bike')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all bikes' })
  @ApiResponse({ status: 200, description: 'List of bikes retrieved successfully.' })
  findAll(): Promise<Bike[]> {
    return this.bikeService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Add a new bike' })
  @ApiResponse({ status: 201, description: 'Bike created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createBikeDto: CreateBikeDto): Promise<Bike> {
    return this.bikeService.create(createBikeDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing bike' })
  @ApiResponse({ status: 200, description: 'Bike updated successfully.' })
  @ApiResponse({ status: 404, description: 'Bike not found.' })
  update(@Param('id') id: string, @Body() updateBikeDto: Partial<CreateBikeDto>): Promise<Bike> {
    return this.bikeService.update(id, updateBikeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a bike' })
  @ApiResponse({ status: 204, description: 'Bike deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Bike not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.bikeService.remove(id);
  }
}