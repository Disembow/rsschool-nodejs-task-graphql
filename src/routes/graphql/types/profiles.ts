import { GraphQLNonNull, GraphQLObjectType, GraphQLBoolean, GraphQLInt } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType, MemberTypeId } from './memberType.js';
import { UserType } from './users.js';
import { IContext, IParent } from './common.js';

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: new GraphQLNonNull(UUIDType) },
    user: {
      type: new GraphQLNonNull(UserType),
      resolve: async ({ userId }: IParent, _, { prisma }: IContext) => {
        return prisma.user.findUnique({
          where: { id: userId },
        });
      },
    },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async ({ memberTypeId }: IParent, _, { prisma }: IContext) => {
        return await prisma.memberType.findUnique({
          where: { id: memberTypeId },
        });
      },
    },
  }),
});
