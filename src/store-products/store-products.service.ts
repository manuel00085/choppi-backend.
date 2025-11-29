import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreProduct } from './store-product.entity';
import { Store } from '../stores/store.entity';
import { Product } from '../products/product.entity';
import { CreateStoreProductDto } from './dto/create-store-product.dto';
import { UpdateStoreProductDto } from './dto/update-store-product.dto';

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

  async create(storeId: number, dto: CreateStoreProductDto) {
    const store = await this.storeRepo.findOne({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Store not found');

    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    const sp = this.storeProductRepo.create({
      store,
      product,
      price: dto.price,
      stock: dto.stock,
    });

    return this.storeProductRepo.save(sp);
  }

  async findAll(
    storeId: number,
    page: number = 1,
    limit: number = 10,
    q?: string,
    inStock?: boolean,
  ) {
 const skip = (page - 1) * limit;

  const store = await this.storeRepo.findOne({ where: { id: storeId } });
  if (!store) throw new NotFoundException('Store not found');

  const query = this.storeProductRepo
    .createQueryBuilder('sp')
    .leftJoinAndSelect('sp.product', 'product')
    .where('sp.storeId = :storeId', { storeId })
    .andWhere('sp.isActive = true')
    .andWhere('product.isActive = true');

  if (q) {
    query.andWhere('product.name ILIKE :q', { q: `%${q}%` });
  }

  if (inStock === true) {
    query.andWhere('sp.stock > 0');
  }

  const [data, total] = await query
    .skip(skip)
    .take(limit)
    .orderBy('sp.id', 'ASC')
    .getManyAndCount();

  return {
    store,
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
  }

  async update(id: number, dto: UpdateStoreProductDto) {
    const sp = await this.storeProductRepo.findOne({ where: { id } });
    if (!sp) throw new NotFoundException('Store product not found');

    Object.assign(sp, dto);
    return this.storeProductRepo.save(sp);
  }

  async remove(id: number) {
    const sp = await this.storeProductRepo.findOne({ where: { id } });
    if (!sp) throw new NotFoundException('Store product not found');

    sp.isActive = false;
    return this.storeProductRepo.save(sp);
  }

  async findOne(storeId: number, storeProductId: number) {
  const sp = await this.storeProductRepo.findOne({
    where: {
      id: storeProductId,
      store: { id: storeId },
    },
  });

  if (!sp) throw new NotFoundException('Store product not found');

  return sp;
}

}
