import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository,  MoreThan } from 'typeorm';
import { StoreProduct } from './store-product.entity';
import { Store } from '../stores/store.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class StoreProductsService {
  constructor(
    @InjectRepository(StoreProduct)
    private readonly storeProductRepo: Repository<StoreProduct>,

    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async addProduct(storeId: number, productId: number, price: number, stock: number) {
    const store = await this.storeRepo.findOne({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Store not found');

    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    const sp = this.storeProductRepo.create({
      store,
      product,
      price,
      stock,
    });

    return this.storeProductRepo.save(sp);
  }

  async getStoreProducts(storeId: number, q?: string, inStock?: boolean, page = 1, limit = 10) {
    const where: any = { store: { id: storeId } };

    if (q) {
      where.product = { name: ILike(`%${q}%`) };
    }

    if (inStock === true) {
      where.stock = MoreThan(0);
    }

    const [data, total] = await this.storeProductRepo.findAndCount({
      where,
      relations: ['product'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total, page, limit };
  }

  async update(storeProductId: number, price: number, stock: number) {
    const sp = await this.storeProductRepo.findOne({ where: { id: storeProductId } });
    if (!sp) throw new NotFoundException('StoreProduct not found');

    sp.price = price;
    sp.stock = stock;

    return this.storeProductRepo.save(sp);
  }

  async remove(storeProductId: number) {
    const sp = await this.storeProductRepo.findOne({ where: { id: storeProductId } });
    if (!sp) throw new NotFoundException('StoreProduct not found');

    return this.storeProductRepo.delete(storeProductId);
  }
}
