import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StoreProductsService } from './store-products.service';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('store-products')
@Controller('stores/:storeId/products')
export class StoreProductsController {
  constructor(private readonly sps: StoreProductsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Body() dto: CreateStoreProductDto,
  ) {
    return this.sps.create(storeId, dto);
  }

  @Get(':storeProductId')
findOne(
  @Param('storeId', ParseIntPipe) storeId: number,
  @Param('storeProductId', ParseIntPipe) storeProductId: number,
) {
  return this.sps.findOne(storeId, storeProductId);
}

  @Get()
  findAll(@Param('storeId', ParseIntPipe) storeId: number) {
    return this.sps.findAll(storeId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStoreProductDto,
  ) {
    return this.sps.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sps.remove(id);
  }
}
