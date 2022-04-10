import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop()
  Name: string;

  @Prop()
  Description: string;

  @Prop({
    type: {
      GilShopItem: {
        Item: [],
      },
    },
  })
  GameContentLinks: {
    GilShopItem: {
      Item: string[];
    };
  };

  @Prop()
  ID: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
