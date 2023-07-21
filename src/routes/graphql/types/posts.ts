import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './users.js';
import { PrismaClient } from '@prisma/client';

export const PostsType = new GraphQLObjectType({
  name: 'PostsType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: new GraphQLNonNull(UserType),
      resolve: async (
        parent: { authorId: string },
        _,
        context: { prisma: PrismaClient },
      ) => {
        return context.prisma.user.findFirst({
          where: { id: parent.authorId },
        });
      },
    },
  }),
});
