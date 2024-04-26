import gql from "graphql-tag";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  #graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Image" type defines the queryable fields for every image in our data source.
  type Image {
    file: String
    description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "images" query returns an array of zero or more Images (defined above).
  type Query {
    images: [Image]
  }
`;

export default typeDefs;
