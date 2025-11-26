import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>,
  ) {}

  async findAll(q?: string, page = 1, limit = 10) {
    const where: any = { isActive: true };
    if (q) {
      where.name = ILike(`%${q}%`);
    }

    const [data, total] = await this.storeRepo.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'ASC' },
    });

    return { data, total, page, limit };
  }

  async findOne(id: number) {
    const store = await this.storeRepo.findOne({ where: { id, isActive: true } });
    if (!store) throw new NotFoundException('Store not found');
    return store;
  }

  async create(dto: CreateStoreDto) {
    const store = this.storeRepo.create(dto);
    return this.storeRepo.save(store);
  }

  async update(id: number, dto: UpdateStoreDto) {
    const store = await this.findOne(id);
    Object.assign(store, dto);
    return this.storeRepo.save(store);
  }

  // Soft delete
  async remove(id: number) {
    const store = await this.findOne(id);
    store.isActive = false;
    return this.storeRepo.save(store);
  }
}
