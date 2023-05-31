import { Conversation, Message, UserResponsObject } from '@/graphql/__generated__/graphql';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { useQuery, useSubscription, useMutation } from '@apollo/client';

import { SUBSCRIBE_TO_MESSAGES } from '@/graphql/graphqlSubscriptions';
import { GET_CONVERSATION_MESSAGES, IS_ME } from '@/graphql/graphqlQueries';
import { CREATE_MESSAGE } from '@/graphql/graphqlMutations';

type ChatMessagesProps = {
    // messages: Message[];
    user: UserResponsObject
    conversation?: Conversation
    refreshConversation: (n: boolean) => void
};

const ChatMessages: React.FC<ChatMessagesProps> = ({ user, conversation, refreshConversation }) => {

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [messageInput, setMessageInput] = React.useState<string>("");

    const { data: subscriptionData, loading, error } = useSubscription(
        SUBSCRIBE_TO_MESSAGES
    );

    const { data: conversationMessagesData, loading: conversationMessagesLoading, error: conversationMessagesError } = useQuery(
        GET_CONVERSATION_MESSAGES,
        {
            // fetchPolicy: "network-only",
            variables: {
                getConversationMessagesId: conversation?.id || "1"
            }
        }
    );

    const [createMessage, { data: createMessageData, loading: createMessageLoading, error: createMessageError }] = useMutation(
        CREATE_MESSAGE,
        {
            refetchQueries: [
                // GET_CONVERSATION_MESSAGES
            ]
        }
    );

    const scrollToBottom = (smooth?: boolean) => {
        const ref = messagesEndRef?.current;
        if (ref) {
            smooth ? ref.scrollIntoView({ behavior: "smooth" }) : ref.scrollIntoView({});
        }
    }


    useEffect(() => {
        // Handle the new message received from the subscription
        if (subscriptionData?.messageCreated) {
            const msg = subscriptionData?.messageCreated as Message;

            // if from the current conversation, add it to the messages
            if (msg.conversation_id === conversation?.id) {
                setMessages([...messages, msg]);
                setTimeout(() => {
                    scrollToBottom(true);
                }, 0);
            }
            else {
                refreshConversation(true)
            }
        }
    }, [subscriptionData]);


    useEffect(() => {
        console.log('conversationMessagesData  2', conversationMessagesData);
        if (conversationMessagesData?.getConversationMessages) {
            const ms = conversationMessagesData.getConversationMessages as Message[];
            setMessages(ms)
            setTimeout(() => {
                scrollToBottom();
            }, 0);

        }
    }, [conversationMessagesData]);


    const handleCreateMessage = async () => {
        try {
            console.log('createMessage');
            console.log('conversation', conversation);
            const recieverIds = conversation?.participantIds;
            if (!recieverIds) {
                throw new Error('No recieverIds');
            }

            if (!messageInput) {
                return;
            }
            if (!conversation?.id) {
                throw new Error('No conversation id');
            }
            const { data } = await createMessage({
                variables: {
                    input: {
                        content: messageInput,
                        conversation_id: conversation?.id,
                        user_id: user.id,
                        username: user.username,
                        receiver_ids: recieverIds
                    }
                }
            });
            console.log('Got create message data', data);
            const msg = data?.addMessage as Message;
            setMessageInput("");
            setMessages([...messages, msg]);
        } catch (error) {
            console.error('error', error);
        }
    }

    const getConversationName = () => {
        if (conversation?.name) {
            return conversation.name;
        } else {
            // set the name to the first user in the conversation
            const firstUserId = conversation?.participantIds[0];
            return "Ingen samtaler endnu"

            // return firstUser?.username;
        }
    }






    return (
        <>

            {/* Chat header */}
            <div className="flex items-center pb-3 mb-6 border-b-2">
                <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                <div className="ml-4">
                    <div className="h-6 text-lg font-bold text-gray-800">{getConversationName()}</div>
                    {/* <div className="w-24 h-4 mt-1 bg-gray-400"></div> */}
                </div>
            </div>
            <div className="flex flex-col space-y-4 overflow-y-scroll">
                {messages.map((message) => (

                    <div key={message.id} >
                        {message.user_id === user.id ? (
                            <div className="flex items-end justify-end" >
                                <div className="p-2 bg-blue-500 rounded-lg">
                                    <div className="h-6 font-bold text-slate-200">{message.username + " (mig)"}</div>
                                    <div className="h-6 mt-1 text-white w-60">{message.content}</div>
                                </div>
                                <div className="w-8 h-8 ml-2 bg-gray-400 rounded-full"></div>
                            </div>
                        ) : (
                            <div className="flex items-start">
                                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                                <div className="p-2 ml-2 bg-gray-200 rounded-lg">
                                    <div className="w-40 h-6 font-bold text-gray-800">{message.username}</div>
                                    <div className="h-6 mt-1 text-gray-600 w-60">{message.content}</div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                <div ref={messagesEndRef} />
            </div>

            {/* Message input bar */}
            <div className="pt-2 mt-auto">
                <div className="flex items-center">
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => {
                            setMessageInput(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleCreateMessage();
                            }
                        }}
                        className="flex-1 px-4 py-2 border border-gray-400 rounded-l-lg"
                        placeholder="Type a message..."
                    />
                    <button
                        className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-r-lg"
                        onClick={handleCreateMessage}
                    >

                        Send
                    </button>
                </div>
            </div>
        </>
    );
};

export default ChatMessages;








