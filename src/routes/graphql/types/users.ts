import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profiles.js';
import { IContext, IParent } from './common.js';

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
  }),
});
