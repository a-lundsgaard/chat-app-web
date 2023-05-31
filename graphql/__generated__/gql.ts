/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation RegisterUser($input: UserRegisterInput!) {\n    registerUser(input: $input) {\n      id\n      username\n      email\n      password\n      created_at\n    }\n  }\n": types.RegisterUserDocument,
    "\n  mutation Login($input: UserLoginInput!) {\n    login(input: $input) {\n      user {\n        username\n        email\n      }\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation CreateConversation($input: ConversationInput!) {\n    createConversation(input: $input) {\n      name\n      owner_id\n      id\n    }\n  }\n": types.CreateConversationDocument,
    "\n  mutation AddMessage($input: MessageInput!) {\n    addMessage(input: $input) {\n      content\n      conversation_id\n      created_at\n      id\n      username\n      user_id\n    }\n  }\n": types.AddMessageDocument,
    "\n  query GetAllUsers {\n    getAllUsers {\n      id\n      username\n      email\n      password\n      created_at\n    }\n  }\n": types.GetAllUsersDocument,
    "\n  query IsMe {\n    isMe {\n      id\n      username\n      email\n      isLoggedIn\n    }\n  }\n": types.IsMeDocument,
    "\n  query GetAllConversationsByUserId($userId: Int!) {\n    getAllConversationsByUserId(user_id: $userId) {\n      name\n      id\n      owner_id\n      created_at\n      participantIds\n    }\n  }\n": types.GetAllConversationsByUserIdDocument,
    "\n  query GetConversationMessages($getConversationMessagesId: ID!) {\n    getConversationMessages(id: $getConversationMessagesId) {\n      content\n      conversation_id\n      user_id\n      username\n    }\n  }\n": types.GetConversationMessagesDocument,
    "\n    subscription MessageCreated {\n    messageCreated {\n        content\n        user_id\n        username\n        conversation_id\n    }\n    }\n": types.MessageCreatedDocument,
    "\n  query IndexPageQuery {\n    getAllUsers {\n      id\n      username\n      email\n      password\n      created_at\n    }\n  }\n": types.IndexPageQueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RegisterUser($input: UserRegisterInput!) {\n    registerUser(input: $input) {\n      id\n      username\n      email\n      password\n      created_at\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterUser($input: UserRegisterInput!) {\n    registerUser(input: $input) {\n      id\n      username\n      email\n      password\n      created_at\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($input: UserLoginInput!) {\n    login(input: $input) {\n      user {\n        username\n        email\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: UserLoginInput!) {\n    login(input: $input) {\n      user {\n        username\n        email\n      }\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateConversation($input: ConversationInput!) {\n    createConversation(input: $input) {\n      name\n      owner_id\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateConversation($input: ConversationInput!) {\n    createConversation(input: $input) {\n      name\n      owner_id\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddMessage($input: MessageInput!) {\n    addMessage(input: $input) {\n      content\n      conversation_id\n      created_at\n      id\n      username\n      user_id\n    }\n  }\n"): (typeof documents)["\n  mutation AddMessage($input: MessageInput!) {\n    addMessage(input: $input) {\n      content\n      conversation_id\n      created_at\n      id\n      username\n      user_id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllUsers {\n    getAllUsers {\n      id\n      username\n      email\n      password\n      created_at\n    }\n  }\n"): (typeof documents)["\n  query GetAllUsers {\n    getAllUsers {\n      id\n      username\n      email\n      password\n      created_at\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query IsMe {\n    isMe {\n      id\n      username\n      email\n      isLoggedIn\n    }\n  }\n"): (typeof documents)["\n  query IsMe {\n    isMe {\n      id\n      username\n      email\n      isLoggedIn\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllConversationsByUserId($userId: Int!) {\n    getAllConversationsByUserId(user_id: $userId) {\n      name\n      id\n      owner_id\n      created_at\n      participantIds\n    }\n  }\n"): (typeof documents)["\n  query GetAllConversationsByUserId($userId: Int!) {\n    getAllConversationsByUserId(user_id: $userId) {\n      name\n      id\n      owner_id\n      created_at\n      participantIds\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetConversationMessages($getConversationMessagesId: ID!) {\n    getConversationMessages(id: $getConversationMessagesId) {\n      content\n      conversation_id\n      user_id\n      username\n    }\n  }\n"): (typeof documents)["\n  query GetConversationMessages($getConversationMessagesId: ID!) {\n    getConversationMessages(id: $getConversationMessagesId) {\n      content\n      conversation_id\n      user_id\n      username\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    subscription MessageCreated {\n    messageCreated {\n        content\n        user_id\n        username\n        conversation_id\n    }\n    }\n"): (typeof documents)["\n    subscription MessageCreated {\n    messageCreated {\n        content\n        user_id\n        username\n        conversation_id\n    }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query IndexPageQuery {\n    getAllUsers {\n      id\n      username\n      email\n      password\n      created_at\n    }\n  }\n"): (typeof documents)["\n  query IndexPageQuery {\n    getAllUsers {\n      id\n      username\n      email\n      password\n      created_at\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;