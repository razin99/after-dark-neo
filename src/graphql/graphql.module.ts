import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { join } from 'path';

/**
 * Format GQL errors
 * Credit: https://stackoverflow.com/a/65932324
 */
const graphQLFormattedErr = (error: GraphQLError) => ({
  message: error.extensions?.exception?.response?.message || error.message,
  // Error code reference: apollographql.com/docs/apollo-server/data/errors/#error-codes
  code: error.extensions?.code || '911',
  name: error.extensions?.exception?.name || error.name,
});

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (conf: ConfigService) => ({
        debug: conf.get('NODE_ENV') === 'development',
        playground: conf.get('NODE_ENV') === 'development',
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        formatError: graphQLFormattedErr,
      }),
    }),
  ],
})
export class GraphqlModule {}
