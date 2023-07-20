import {
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt,
  GraphQLString,
} from 'graphql';

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  description: 'Member',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    postsLimitPerMounth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    // TODO: associate with profiles
  }),
});

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeIdEnum',
  description: 'Member could choose from 2 different types',
  values: {
    basic: { value: 'basic', description: 'Basic membership' },
    business: { value: 'business', description: 'Business membership' },
  },
});
