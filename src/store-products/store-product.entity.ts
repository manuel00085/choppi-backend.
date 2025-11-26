import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Store } from '../stores/store.entity';
import { Product } from '../products/product.entity';

@Entity()
@Unique(['store', 'product'])
export class StoreProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, (store) => store.storeProducts)
  store: Store;

  @ManyToOne(() => Product, (product) => product.storeProducts)
  product: Product;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;
}
