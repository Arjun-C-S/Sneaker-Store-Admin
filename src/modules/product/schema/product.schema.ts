import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({
    unique: true,
  })
  id: number;

  @Prop({ required: true, name: 'category_id' })
  categoryId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, maxlength: 225 })
  description: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true, default: 1 })
  pieces: number;

  @Prop({ required: true, default: false, name: 'in_stock' })
  inStock: boolean;

  @Prop({ required: true, default: false, name: 'is_offer_available' })
  isOfferAvailable: boolean;

  @Prop({ required: true, default: false, name: 'is_coupon_available' })
  isCouponAvailable: boolean;

  @Prop({ required: true, default: [] })
  images: string[];

  @Prop({ default: '', name: 'display_image' })
  displayImage: string;

  @Prop({ required: true, name: 'prepare_time' })
  prepareTime: string;

  @Prop({ required: true, default: false, name: 'is_active' })
  isActive: boolean;
}

export type ProductDocument = HydratedDocument<Product>;
export type ProductModel = Model<ProductDocument, Product>;
export const ProductSchema = SchemaFactory.createForClass(Product);

// Creating a 9 digit random id for the product data
ProductSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = Math.floor(Math.random() * 1000000000000000);
  }
  next();
});
