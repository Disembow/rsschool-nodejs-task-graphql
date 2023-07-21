import {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import { ProfileType } from './profiles.js';
import { IContext, IParent } from './common.js';

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  description: 'Membership options',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    postsLimitPerMonth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    profiles: {
      type: new GraphQLNonNull(ProfileType),
      resolve: async ({ id }: IParent, _, { prisma }: IContext) => {
        return await prisma.profile.findMany({
          where: { memberTypeId: id },
        });
      },
    },
  }),
});

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  description: 'Member could choose from 2 different types',
  values: {
    basic: { value: 'basic', description: 'Basic membership' },
    business: { value: 'business', description: 'Business membership' },
  },
});
