const resolvers = {
  Query: {
    images: (_: any, __: any, { dataSources }: any) => {
      return dataSources.images.getImages();
    },
  },
  Track: {
    author: ({ authorId }: any, _: any, { dataSources }: any) => {
      return dataSources.trackAPI.getAuthor(authorId);
    },
  },
};

export default resolvers;
