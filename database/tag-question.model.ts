import { model, models, Schema, Types } from 'mongoose';

export interface ITagQuestion {
  tag: Types.ObjectId;
  question: Types.ObjectId;
}

const TagQuestionSchema = new Schema<ITagQuestion>(
  {
    tag: { types: Schema.Types.ObjectId, ref: 'Tag', required: true },
    question: { types: Schema.Types.ObjectId, ref: 'Question', required: true },
  },
  { timestamps: true },
);

const TagQuestion =
  models?.TagQuestion || model<ITagQuestion>('TagQuestion', TagQuestionSchema);

export default TagQuestion;
