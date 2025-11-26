import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StoreProduct } from '../store-products/store-product.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: true })
  isActive: boolean; // para soft delete

  @OneToMany(() => StoreProduct, (sp) => sp.store)
  storeProducts: StoreProduct[];
}