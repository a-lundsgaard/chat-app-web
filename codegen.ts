import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: process.env.GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
    // documents: ['app/**/*.tsx'],
    documents: ['graphql/*.tsx'],

    generates: {
        './graphql/__generated__/':
        // './__generated__/':

        {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            }
        }
    },
    ignoreNoDocuments: true,
};

export default config;