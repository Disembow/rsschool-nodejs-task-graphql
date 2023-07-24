import { GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from './users.js';
import { IContext, IParent } from './common.js';

export const SubscribersType = new GraphQLObjectType({
  name: 'SubscribersType',
  fields: () => ({
    subscriber: { type: UserType as GraphQLObjectType<IParent, IContext> },
    subscriberId: { type: GraphQLString },
    author: { type: UserType as GraphQLObjectType<IParent, IContext> },
    authorId: { type: GraphQLString },
  }),
});
