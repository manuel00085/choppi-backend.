import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StoreProduct } from '../store-products/store-product.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => StoreProduct, (sp) => sp.product)
  storeProducts: StoreProduct[];
}
