import { DataSource } from 'typeorm';
import { Store } from './stores/store.entity';
import { Product } from './products/product.entity';
import { StoreProduct } from './store-products/store-product.entity';
import { User } from './users/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Store, Product, StoreProduct, User],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false, // 🔥 Importante: migraciones reemplazan synchronize
});
