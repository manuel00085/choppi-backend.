import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StoresModule } from './stores/stores.module';
//import { CartModule } from './cart/cart.module';
import { StoreProductsModule } from './store-products/store-products.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '5432', 10), 
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: false, // True SOLO para desarrollo.
      }),
    }),
    UsersModule,
    AuthModule,
    StoresModule,
    StoreProductsModule,
    ProductsModule,
    StoreProductsModule,
   // CartModule,
  ],
})
export class AppModule {}