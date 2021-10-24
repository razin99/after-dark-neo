import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { join } from 'path';
import { ApiConfigModule } from 'src/api-config/api-config.module';
import { ApiConfigService } from 'src/api-config/api-config.service';

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
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (conf: ApiConfigService) => ({
        debug: conf.NODE_ENV === 'development',
        playground: conf.NODE_ENV === 'development',
        autoSchemaFile:
          conf.NODE_ENV === 'development'
            ? join(process.cwd(), 'src/schema.gql')
            : true,
        formatError: graphQLFormattedErr,
      }),
    }),
  ],
})
export class GraphqlModule {}
