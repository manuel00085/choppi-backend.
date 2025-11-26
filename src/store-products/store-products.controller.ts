import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { StoreProductsService } from './store-products.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('store-products')
@Controller('stores/:storeId/products')
export class StoreProductsController {
  constructor(private readonly storeProductsService: StoreProductsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  addProduct(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Body() body: { productId: number; price: number; stock: number },
  ) {
    return this.storeProductsService.addProduct(storeId, body.productId, body.price, body.stock);
  }

  @Get()
  getProducts(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Query('q') q?: string,
    @Query('inStock') inStock?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.storeProductsService.getStoreProducts(
      storeId,
      q,
      inStock === 'true',
      +page,
      +limit,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':storeProductId')
  update(
    @Param('storeProductId', ParseIntPipe) id: number,
    @Body() body: { price: number; stock: number },
  ) {
    return this.storeProductsService.update(id, body.price, body.stock);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':storeProductId')
  remove(@Param('storeProductId', ParseIntPipe) id: number) {
    return this.storeProductsService.remove(id);
  }
}
