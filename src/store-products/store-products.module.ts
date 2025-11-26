import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreProduct } from './store-product.entity';
import { StoreProductsService } from './store-products.service';
import { StoreProductsController } from './store-products.controller';
import { Store } from '../stores/store.entity';
import { Product } from '../products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreProduct, Store, Product])],
  providers: [StoreProductsService],
  controllers: [StoreProductsController],
  exports: [StoreProductsService],
})
export class StoreProductsModule {}
