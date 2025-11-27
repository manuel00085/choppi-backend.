import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Store } from '../stores/store.entity';
import { Product } from '../products/product.entity';
import { StoreProduct } from '../store-products/store-product.entity';
import * as bcrypt from 'bcrypt';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Store, Product, StoreProduct],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();
  console.log('🔥 Conectado a la base de datos');

  // Crear usuario admin
  const userRepo = AppDataSource.getRepository(User);
  const existAdmin = await userRepo.findOne({ where: { email: 'admin@admin.com' } });

  if (!existAdmin) {
    const passwordHash = await bcrypt.hash('123456', 10);
    await userRepo.save(userRepo.create({
      email: 'admin@admin.com',
      password: passwordHash
    }));
    console.log('👤 Usuario admin creado');
  }

  // Crear tiendas
  const storeRepo = AppDataSource.getRepository(Store);
  const stores = await storeRepo.save([
    storeRepo.create({ name: 'Tienda Caracas', address: 'Sabana Grande' }),
    storeRepo.create({ name: 'Tienda Valencia', address: 'Centro' }),
    storeRepo.create({ name: 'Tienda Maracaibo', address: 'Laguna Mall' }),
  ]);
  console.log('🏪 Tiendas creadas');

  // Crear productos
  const productRepo = AppDataSource.getRepository(Product);
  const products = await productRepo.save([
  { name: 'Camisa Deportiva', description: 'Tela fresca' },
  { name: 'Pantalón Fitness', description: 'Tela stretch' },
  { name: 'Chaqueta Térmica', description: 'Para frío' },
  { name: 'Zapatos Running', description: 'Alta resistencia' },
  { name: 'Gorra Running', description: 'Ligera' },
  { name: 'Short Deportivo', description: 'Secado rápido' },
  { name: 'Medias Antideslizantes', description: 'Confort' },
  { name: 'Bandana Deportiva', description: 'Absorbente' },
  { name: 'Suéter Ligero', description: 'Comodidad' },
  { name: 'Pantalón Jogger', description: 'Ajuste moderno' },
  { name: 'Short Deportivo', description: 'Secado rápido y ligero' },
  { name: 'Suéter Ligero', description: 'Ideal para clima templado' },
  { name: 'Bandana Deportiva', description: 'Absorbe sudor' },
  { name: 'Pantalón Jogger', description: 'Ajuste moderno y cómodo' },
  { name: 'Medias Deportivas', description: 'Antideslizantes y acolchadas' },
  ]);
  console.log('📦 Productos creados');

  // Crear store-products (inventario)
  const spRepo = AppDataSource.getRepository(StoreProduct);

  for (const store of stores) {
    for (const product of products) {
      await spRepo.save(
        spRepo.create({
          store,
          product,
          price: Math.floor(Math.random() * 50) + 10,
          stock: Math.floor(Math.random() * 30) + 5,
          isActive: true,
        }),
      );
    }
  }

  console.log('🏷️ Inventario asignado a tiendas');

  await AppDataSource.destroy();
  console.log('✨ Seed finalizado');
}

seed();
