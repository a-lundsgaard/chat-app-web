// import { gql } from './__generated__/gql';
import { gql } from "@/graphql/__generated__";


export const SUBSCRIBE_TO_MESSAGES = gql(`
    subscription MessageCreated {
    messageCreated {
        content
        user_id
        username
        conversation_id
    }
    }
`);