import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profiles.js';
import { IContext, IParent } from './common.js';
import { PostType } from './posts.js';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    profile: {
      type: ProfileType as GraphQLObjectType<IParent, IContext>,
      resolve: async ({ id }: IParent, _, { prisma }: IContext) => {
        return await prisma.profile.findUnique({ where: { userId: id } });
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: IParent, _, { prisma }: IContext) => {
        return await prisma.post.findMany({
          where: { authorId: id },
        });
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: IParent, _, { prisma }: IContext) => {
        const result = await prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: id },
          select: { author: true },
        });

        return result.map((e) => e.author);
      },
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: IParent, _, { prisma }: IContext) => {
        const result = await prisma.subscribersOnAuthors.findMany({
          where: { authorId: id },
          select: { subscriber: true },
        });

        return result.map((e) => e.subscriber);
      },
    },
  }),
});
