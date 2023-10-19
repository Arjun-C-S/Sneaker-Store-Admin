import { ConfigService } from '@nestjs/config';
import { ConfigType } from 'env.interface';

export function configureMongoose(config: ConfigService<ConfigType>): {
  uri: string;
} {
  return { uri: config.get('MONGODB_URI', { infer: true }) };
}
