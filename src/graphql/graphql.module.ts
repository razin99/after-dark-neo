import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { join } from 'path/posix';

/**
 * Format GQL errors
 * Credit: https://stackoverflow.com/a/65932324
 */
const graphQLFormattedErr = (error: GraphQLError) => ({
  message: error.extensions?.exception?.response?.message || error.message,
  code: error.extensions?.response?.statusCode || '911',
  name: error.extensions?.exception?.name || error.name,
});

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: graphQLFormattedErr,
    }),
  ],
})
export class GraphqlModule {}

// TODO: turn off playground and debug on prod
