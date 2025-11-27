import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Store } from '../stores/store.entity';
import { Product } from '../products/product.entity';

@Entity()
export class StoreProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, (store) => store.storeProducts, { eager: true })
  store: Store;

  @ManyToOne(() => Product, (product) => product.storeProducts, { eager: true })
  product: Product;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @Column({ default: true })
  isActive: boolean;
}
