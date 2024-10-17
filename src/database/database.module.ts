import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

type BuildDbURLOptions = {
  protocol: string;
  host: string;
  port: string;
  user: string;
  pass: string;
  dbName: string;
  authSource: string;
};

const buildUrl = (opts: BuildDbURLOptions) => {
  let uri = `${opts.protocol}://`;
  if (opts.user && opts.pass) {
    uri += `${opts.user}:${opts.pass}@`;
  }

  uri += `${opts.host}:${opts.port}/${opts.dbName}?authSource=${opts.authSource}`;
  return uri;
};

export const DatabaseModule = MongooseModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    let mongoUrl = config.get('MONGODB_URL');
    const dbName = config.getOrThrow('MONGODB_DATABASE');

    if (!mongoUrl) {
      const connection = {
        user: config.getOrThrow('MONGODB_USER') || undefined,
        pass: config.getOrThrow('MONGODB_PASSWORD') || undefined,
        dbName: dbName,
        port: config.getOrThrow('MONGODB_PORT'),
        host: config.getOrThrow('MONGODB_HOST'),
        authSource: config.getOrThrow('MONGODB_AUTH_SOURCE'),
        protocol: config.getOrThrow('MONGODB_PROTOCOL'),
      };

      mongoUrl = buildUrl(connection);
    }

    return {
      uri: mongoUrl,
      dbName,
    };
  },
});
