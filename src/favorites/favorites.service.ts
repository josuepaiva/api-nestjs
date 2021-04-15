import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../users/user';
import { FavoriteDto } from './dto/favorite.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private productsService: ProductsService,
  ) {}
  async listarFavorites(userId: string): Promise<any[]> {
    const ops = [];
    const favorites = await this.userModel.aggregate([
      {
        $match: {
          _id: Types.ObjectId(userId),
        },
      },
      {
        $project: {
          productsFavorits: 1,
          _id: 0,
        },
      },
      {
        $unwind: {
          path: '$productsFavorits',
          preserveNullAndEmptyArrays: false,
        },
      },
    ]);

    const array = favorites.map((ele) => ele.productsFavorits);

    for (let i = 0; i < array.length; i += 1) {
      ops.push(this.productsService.getById(array[i]));
    }
    return await Promise.all(ops);
  }

  async favoritar(favoritarDto: FavoriteDto): Promise<number> {
    const { userId, productId } = favoritarDto;

    if (await this.isWasFavorite2(productId)) {
      throw new BadRequestException('Produto já foi favoritado');
    }

    if (!(await this.productsService.existProduct(productId))) {
      throw new NotFoundException('Produto não existe');
    }

    const result = await this.userModel.updateOne(
      { _id: userId },
      { $push: { productsFavorits: productId } },
    );
    return result.nModified;
  }

  async desFavoritar(favoritarDto: FavoriteDto): Promise<number> {
    const { userId, productId } = favoritarDto;
    const result = await this.userModel.updateOne(
      { _id: userId },
      { $pull: { productsFavorits: { $in: [productId] } } },
    );
    return result.nModified;
  }

  private async isWasFavorite(
    userId: string,
    productId: string,
  ): Promise<boolean> {
    const res = await this.userModel.find({
      _id: userId,
      productsFavorits: { $in: [productId] },
    });

    if (res.length > 0) {
      return true;
    }
    return false;
  }

  private async isWasFavorite2(productId: string): Promise<boolean> {
    const res = await this.userModel.aggregate([
      {
        $match: {
          productsFavorits: { $in: [productId] },
        },
      },
    ]);
    if (res.length > 0) {
      return true;
    }
    return false;
  }
}
