import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './users.js';
import { IContext, IParent } from './common.js';

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLString) },

    author: {
      type: new GraphQLNonNull(UserType),
      resolve: async ({ authorId }: IParent, _, { prisma }: IContext) => {
        return await prisma.user.findUnique({
          where: { id: authorId },
        });
      },
    },
  }),
});
