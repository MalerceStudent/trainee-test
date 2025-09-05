import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TrainsService } from './trains.service';
import { CreateTrainDto } from './dtos/create-train.dto';
import { UpdateTrainDto } from './dtos/update-train.dto';
import { instanceToPlain } from 'class-transformer';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { TrainDto } from './dtos/train.dto';
import { JwtAuthGuard } from 'src/users/guards/jwt-auth.guard';

@Controller('trains')
@UseGuards(JwtAuthGuard)
export class TrainsController {
    constructor(private trainsService: TrainsService) {}

    @Get()
    async getAllTrains(@Req() req: any) {
        const trains = await this.trainsService.findAllTrains(parseInt(req.user.userId));
        return trains
    }

    @Get("/:id")
    async getTrainById(@Param("id") id: string, @Req() req: any) {
        return await this.trainsService.findTrainById(parseInt(id), parseInt(req.user.userId))
    }

    @Post()
    async createTrain(@Body() body: CreateTrainDto, @Req() req: any) {
        return await this.trainsService.create(body, parseInt(req.user.userId))
    }

    @Patch('/:id')
    async updateTrain(@Param("id") id: string, @Body() body: UpdateTrainDto, @Req() req: any) {
        return await this.trainsService.update(parseInt(id), body, parseInt(req.user.userId))
    }

    @Delete(':id')
      async deleteTrain(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
      return await this.trainsService.delete(id, parseInt(req.user.userId));
    }

}
