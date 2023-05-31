/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Conversation = {
  __typename?: 'Conversation';
  created_at: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  owner_id: Scalars['Int'];
  participantIds: Array<Scalars['Int']>;
};

export type ConversationInput = {
  name?: InputMaybe<Scalars['String']>;
  owner_id: Scalars['Int'];
  participantIds: Array<Scalars['Int']>;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  conversation_id: Scalars['ID'];
  created_at: Scalars['String'];
  id: Scalars['Int'];
  user_id: Scalars['Int'];
  username?: Maybe<Scalars['String']>;
};

export type MessageInput = {
  content: Scalars['String'];
  conversation_id: Scalars['ID'];
  receiver_ids: Array<Scalars['Int']>;
  user_id: Scalars['Int'];
  username: Scalars['String'];
};

/** MUTATIONS */
export type Mutation = {
  __typename?: 'Mutation';
  addMessage: Message;
  createConversation: Conversation;
  login: UserLoginResponse;
  registerUser: User;
  root?: Maybe<Scalars['String']>;
};


/** MUTATIONS */
export type MutationAddMessageArgs = {
  input: MessageInput;
};


/** MUTATIONS */
export type MutationCreateConversationArgs = {
  input: ConversationInput;
};


/** MUTATIONS */
export type MutationLoginArgs = {
  input: UserLoginInput;
};


/** MUTATIONS */
export type MutationRegisterUserArgs = {
  input: UserRegisterInput;
};

/** QUERIES */
export type Query = {
  __typename?: 'Query';
  getAllConversationsByUserId: Array<Conversation>;
  getAllUsers: Array<User>;
  getConversationMessages?: Maybe<Array<Maybe<Message>>>;
  getMessagesByConversationIdWithUser?: Maybe<Array<Maybe<Message>>>;
  getMessagesFromConversation: Array<Message>;
  getUsersByUsername?: Maybe<Array<User>>;
  isMe?: Maybe<UserResponsObject>;
  root?: Maybe<Scalars['String']>;
};


/** QUERIES */
export type QueryGetAllConversationsByUserIdArgs = {
  user_id: Scalars['Int'];
};


/** QUERIES */
export type QueryGetConversationMessagesArgs = {
  id: Scalars['ID'];
};


/** QUERIES */
export type QueryGetMessagesByConversationIdWithUserArgs = {
  id: Scalars['ID'];
};


/** QUERIES */
export type QueryGetMessagesFromConversationArgs = {
  conversation_id: Scalars['ID'];
};


/** QUERIES */
export type QueryGetUsersByUsernameArgs = {
  username: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  conversationCreated?: Maybe<Message>;
  conversationMessageAdded?: Maybe<Message>;
  messageCreated?: Maybe<Message>;
  root?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  created_at: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

/** The response for when a user is successfully logged in */
export type UserLoginResponse = {
  __typename?: 'UserLoginResponse';
  token: Scalars['String'];
  user?: Maybe<UserResponsObject>;
};

/** Inputs */
export type UserRegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponsObject = {
  __typename?: 'UserResponsObject';
  email: Scalars['String'];
  id: Scalars['Int'];
  isLoggedIn?: Maybe<Scalars['Boolean']>;
  username: Scalars['String'];
};

export type RegisterUserMutationVariables = Exact<{
  input: UserRegisterInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', id: number, username: string, email: string, password: string, created_at: string } };

export type LoginMutationVariables = Exact<{
  input: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserLoginResponse', token: string, user?: { __typename?: 'UserResponsObject', username: string, email: string } | null } };

export type CreateConversationMutationVariables = Exact<{
  input: ConversationInput;
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'Conversation', name?: string | null, owner_id: number, id: string } };

export type AddMessageMutationVariables = Exact<{
  input: MessageInput;
}>;


export type AddMessageMutation = { __typename?: 'Mutation', addMessage: { __typename?: 'Message', content: string, conversation_id: string, created_at: string, id: number, username?: string | null, user_id: number } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: number, username: string, email: string, password: string, created_at: string }> };

export type IsMeQueryVariables = Exact<{ [key: string]: never; }>;


export type IsMeQuery = { __typename?: 'Query', isMe?: { __typename?: 'UserResponsObject', id: number, username: string, email: string, isLoggedIn?: boolean | null } | null };

export type GetAllConversationsByUserIdQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetAllConversationsByUserIdQuery = { __typename?: 'Query', getAllConversationsByUserId: Array<{ __typename?: 'Conversation', name?: string | null, id: string, owner_id: number, created_at: string, participantIds: Array<number> }> };

export type GetConversationMessagesQueryVariables = Exact<{
  getConversationMessagesId: Scalars['ID'];
}>;


export type GetConversationMessagesQuery = { __typename?: 'Query', getConversationMessages?: Array<{ __typename?: 'Message', content: string, conversation_id: string, user_id: number, username?: string | null } | null> | null };

export type MessageCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MessageCreatedSubscription = { __typename?: 'Subscription', messageCreated?: { __typename?: 'Message', content: string, user_id: number, username?: string | null, conversation_id: string } | null };

export type IndexPageQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type IndexPageQueryQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', id: number, username: string, email: string, password: string, created_at: string }> };


export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserRegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateConversationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateConversation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConversationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner_id"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateConversationMutation, CreateConversationMutationVariables>;
export const AddMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"conversation_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}}]}}]}}]} as unknown as DocumentNode<AddMessageMutation, AddMessageMutationVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const IsMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"isLoggedIn"}}]}}]}}]} as unknown as DocumentNode<IsMeQuery, IsMeQueryVariables>;
export const GetAllConversationsByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllConversationsByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllConversationsByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"owner_id"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"participantIds"}}]}}]}}]} as unknown as DocumentNode<GetAllConversationsByUserIdQuery, GetAllConversationsByUserIdQueryVariables>;
export const GetConversationMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetConversationMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getConversationMessagesId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getConversationMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getConversationMessagesId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"conversation_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<GetConversationMessagesQuery, GetConversationMessagesQueryVariables>;
export const MessageCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"MessageCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"user_id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"conversation_id"}}]}}]}}]} as unknown as DocumentNode<MessageCreatedSubscription, MessageCreatedSubscriptionVariables>;
export const IndexPageQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IndexPageQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"password"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<IndexPageQueryQuery, IndexPageQueryQueryVariables>;