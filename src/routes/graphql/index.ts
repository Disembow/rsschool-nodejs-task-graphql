import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  graphql,
} from 'graphql';
import { MemberType, MemberTypeIdEnum } from './types/memberType.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

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
        name: 'Query',
        fields: {
          memberType: {
            type: MemberType,
            args: {
              id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
            },
            resolve: async (_, args: { id: string }) => {
              return await prisma.memberType.findFirst({
                where: {
                  id: args.id,
                },
              });
            },
          },

          memberTypes: {
            type: new GraphQLList(MemberType),
            resolve: async () => {
              return await prisma.memberType.findMany();
            },
          },
        },
      });

      const mutation = new GraphQLObjectType({
        name: 'Mutations',
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
