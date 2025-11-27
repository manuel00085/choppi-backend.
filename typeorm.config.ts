import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';
import { Store } from './src/stores/store.entity';
import { Product } from './src/products/product.entity';
import { StoreProduct } from './src/store-products/store-product.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Store, Product, StoreProduct],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
