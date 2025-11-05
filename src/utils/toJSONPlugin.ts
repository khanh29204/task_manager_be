import {Schema} from 'mongoose';

export function toJSONPlugin(
  schema: Schema,
  options?: {hideFields?: string[]},
) {
  schema.index({
    createdAt: 1,
    updatedAt: 1,
  });
  schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
      ret.id = (ret._id as any).toString();
      delete ret._id;

      if (options?.hideFields) {
        options.hideFields.forEach(f => delete ret[f]);
      }
    },
  });
}
