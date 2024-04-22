import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { SubcatModule } from './subcategory/sub.module';
import { BrandModule } from './brand/brand.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewModule } from './review/review.module';
import { CouponModule } from './coupon/coupon.module';
import { CartModule } from './cart/cart.module';
import { AddressModule } from './address/address.module';
import { WishlistController } from './wishlist/wishlist.controller';
import { OrderController } from './order/order.controller';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({envFilePath:".env",isGlobal:true})
    ,CategoryModule,SubcatModule,CouponModule,
    BrandModule,ProductModule,UserModule,
    PrismaModule,ReviewModule,BrandModule,CartModule,
    AddressModule,WishlistModule,OrderModule
  ]
})
export class AppModule {}
