import { Module } from '@nestjs/common';
import { TrainsController } from './trains.controller';
import { TrainsService } from './trains.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Train } from './train.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Train])],
  controllers: [TrainsController],
  providers: [TrainsService]
})
export class TrainsModule {}
