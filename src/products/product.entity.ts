import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StoreProduct } from '../store-products/store-product.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
 isActive: boolean;


  @Column({ nullable: true })
  description: string;

  @OneToMany(() => StoreProduct, (sp) => sp.product)
  storeProducts: StoreProduct[];
}
