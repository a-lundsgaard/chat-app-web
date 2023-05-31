// import gql from 'graphql-tag';

// import { gql } from "@apollo/client";

// import { gql } from './__generated__/gql';

import { gql } from "@/graphql/__generated__";


// Query: Get all users
export const GET_ALL_USERS = gql(`
  query GetAllUsers {
    getAllUsers {
      id
      username
      email
      password
      created_at
    }
  }
`);


export const IS_ME = gql(`
  query IsMe {
    isMe {
      id
      username
      email
      isLoggedIn
    }
  }
`);

export const GET_CONVERSATIONS = gql(`
  query GetAllConversationsByUserId($userId: Int!) {
    getAllConversationsByUserId(user_id: $userId) {
      name
      id
      owner_id
      created_at
      participantIds
    }
  }
`);


export const GET_CONVERSATION_MESSAGES = gql(`
  query GetConversationMessages($getConversationMessagesId: ID!) {
    getConversationMessages(id: $getConversationMessagesId) {
      content
      conversation_id
      user_id
      username
    }
  }
`);