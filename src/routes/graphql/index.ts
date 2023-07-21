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
import { PostsType } from './types/posts.js';
import { UserType } from './types/users.js';
import { UUIDType } from './types/uuid.js';
import { ProfilesType } from './types/profiles.js';

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
          // Members
          memberType: {
            type: MemberType,
            args: {
              id: { type: new GraphQLNonNull(MemberTypeIdEnum) },
            },
            resolve: async (_, args: { id: string }) => {
              return await prisma.memberType.findFirst({
                where: { id: args.id },
              });
            },
          },

          memberTypes: {
            type: new GraphQLList(MemberType),
            resolve: async () => {
              return await prisma.memberType.findMany();
            },
          },

          // Posts
          post: {
            type: PostsType,
            args: {
              id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (_, args: { id: string }) => {
              return await prisma.post.findUnique({
                where: { id: args.id },
              });
            },
          },

          posts: {
            type: new GraphQLList(PostsType),
            resolve: async () => {
              return await prisma.post.findMany();
            },
          },

          // Users
          user: {
            type: UserType,
            args: {
              id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (_, args: { id: string }) => {
              return await prisma.user.findUnique({
                where: { id: args.id },
              });
            },
          },

          users: {
            type: new GraphQLList(UserType),
            resolve: async () => {
              return await prisma.user.findMany();
            },
          },

          // Profiles
          profile: {
            type: ProfilesType,
            args: {
              id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (_, args: { id: string }) => {
              return await prisma.profile.findUnique({
                where: { id: args.id },
              });
            },
          },

          profiles: {
            type: new GraphQLList(ProfilesType),
            resolve: async () => {
              return await prisma.profile.findMany();
            },
          },
        },
      });

      // const mutation = new GraphQLObjectType({
      //   name: 'Mutations',
      //   fields: {},
      // });

      const schema = new GraphQLSchema({
        query,
        // mutation,
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
