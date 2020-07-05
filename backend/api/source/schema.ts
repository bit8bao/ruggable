import * as path from "path";
import * as mergeGraphqlSchemas from "merge-graphql-schemas";

const fileLoader = mergeGraphqlSchemas.fileLoader;
const mergeTypes = mergeGraphqlSchemas.mergeTypes;
const typesArray = fileLoader(path.join(__dirname, "graphql/**/*.graphql"));

export default mergeTypes(typesArray, { all: true });
