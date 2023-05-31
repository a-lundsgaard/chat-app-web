import { gql } from "@/graphql/__generated__";

// Mutation: Register a user
export const REGISTER_USER = gql(`
  mutation RegisterUser($input: UserRegisterInput!) {
    registerUser(input: $input) {
      id
      username
      email
      password
      created_at
    }
  }
`);


export const SIGNIN_USER = gql(`
  mutation Login($input: UserLoginInput!) {
    login(input: $input) {
      user {
        username
        email
      }
      token
    }
  }
`);

export const CREATE_CONVERSATION = gql(`
  mutation CreateConversation($input: ConversationInput!) {
    createConversation(input: $input) {
      name
      owner_id
      id
    }
  }
`);


export const CREATE_MESSAGE = gql(`
  mutation AddMessage($input: MessageInput!) {
    addMessage(input: $input) {
      content
      conversation_id
      created_at
      id
      username
      user_id
    }
  }
`);