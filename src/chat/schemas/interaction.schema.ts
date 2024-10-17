import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InteractionDocument = HydratedDocument<Interaction>;

@Schema({ autoCreate: false })
export class Interaction {
  @Prop({ type: String, required: true })
  question: string;

  @Prop({ type: String, required: true })
  answer: string;

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}

export const InteractionSchema = SchemaFactory.createForClass(Interaction);
