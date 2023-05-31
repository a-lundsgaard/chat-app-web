"use client";

import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    SuspenseCache,
    split
} from "@apollo/client";
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";



import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';


const GRAPHQL_ENDPOINT =
    process.env.NEXT_PUBLIC_DEFAULT_GATEWAY || "http://localhost:3000/api/proxy/default";

function makeClient() {

    // console.log('TOKEN Æ !!!!', token);


    const httpLink = new HttpLink({
        uri: GRAPHQL_ENDPOINT,
        credentials: 'include'
    });

    const wsLink = new GraphQLWsLink(createClient({
        url: 'ws://localhost:4000/subscriptions',
        // url: 'ws://localhost:3000/api/subscribe',
        retryAttempts: 10, // if connection is lost, try to reconnect 10 times e.g. when browser refreshes
        shouldRetry(errOrCloseEvent) {
            if (errOrCloseEvent instanceof CloseEvent) {
                // retry connection only if network error
                return errOrCloseEvent.code >= 4000 || errOrCloseEvent.code < 5000;
            }
            // return true;
            return true;
        },

    }));

    // The split function takes three parameters:
    //
    // * A function that's called for each operation to execute
    // * The Link to use for an operation if the function returns a "truthy" value
    // * The Link to use for an operation if the function returns a "falsy" value
    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );


    return new ApolloClient({
        credentials: "include",
        cache: new NextSSRInMemoryCache(),
        link: splitLink
        // typeof window === "undefined"
        //     ? ApolloLink.from([
        //         // in a SSR environment, if you use multipart features like
        //         // @defer, you need to decide how to handle these.
        //         // This strips all interfaces with a `@defer` directive from your queries.
        //         new SSRMultipartLink({
        //             stripDefer: true,
        //         }),
        //         httpLink,
        //     ])
        //     : httpLink,
    });
}

function makeSuspenseCache() {
    return new SuspenseCache();
}




export function ApolloWrapper({ children }: React.PropsWithChildren) {

    return (
        <ApolloNextAppProvider
            makeClient={makeClient}
            makeSuspenseCache={makeSuspenseCache}
        >
            {children}
        </ApolloNextAppProvider>
    );
}
