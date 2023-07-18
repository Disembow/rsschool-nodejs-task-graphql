import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLObjectType, GraphQLSchema, graphql } from 'graphql';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },

    async handler(req) {
      const query = new GraphQLObjectType({
        name: 'query',
        fields: {},
      });

      const mutation = new GraphQLObjectType({
        name: 'mutations',
        fields: {},
      });

      const schema = new GraphQLSchema({
        query,
        mutation,
      });
      const source = req.body.query;
      const variableValues = req.body.variables;

      const { data, errors } = await graphql({
        schema,
        source,
        variableValues,
      });

      return { data, errors };
    },
  });
};

export default plugin;
