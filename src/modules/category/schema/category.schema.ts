import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';

@Schema({ timestamps: true })
export class Category {
  @Prop({
    unique: true,
  })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, maxlength: 225 })
  description: string;
}

export type CategoryDocument = HydratedDocument<Category>;
export type CategoryModel = Model<CategoryDocument, Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);

// Creating a 9 digit random id for the product data
CategorySchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = Math.floor(Math.random() * 1000000000);
  }
  next();
});
