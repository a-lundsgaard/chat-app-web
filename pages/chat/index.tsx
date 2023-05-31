// write quick page

// import type { NextPageWithLayout } from './_app';
import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { NextPageWithLayout } from '../_app';
import Head from 'next/head';
import Router from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_USERS, GET_CONVERSATIONS } from '@/graphql/graphqlQueries';
import { CREATE_CONVERSATION } from '@/graphql/graphqlMutations';
import ChatMessages from '@/components/chatMessages';

import { GetServerSidePropsContext } from 'next';
// import { cookies } from 'next/dist/client/components/headers';
// import { Conversation, User, UserResponsObject } from '@/graphql/__generated__/graphql';
import { Conversation, User, UserResponsObject } from '@/graphql/__generated__/graphql';
import verifyUser from '@/lib/verifyUser';

interface IUserStatus {
    user: UserResponsObject;
}

export default function Chat({
    user,
}: IUserStatus): ReactElement {

    const [searchText, setSearchText] = useState("");
    const [addedUsers, setAddedUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [currentConversation, setConversation] = useState<Conversation>();
    const [allUsers, setAllUsers] = useState<User[]>([]);

    const [sidebarVisible, setSidebarVisible] = useState(false);


    const { data: fetchedUsers, loading, error } = useQuery(GET_ALL_USERS);

    const { data: conversationData, loading: conversationLoading, error: conversationError, refetch: refetchConversations } = useQuery(GET_CONVERSATIONS, {
        variables: {
            userId: user.id
        },
    });

    if (conversationError) {
        console.error('conversationError', conversationError);
        // refresh page
        // window.location.href = '/chat';
    }

    // create conversation
    const [createConversation, { data: createConData, loading: createConLoading, error: createConError }] = useMutation(CREATE_CONVERSATION, {
        refetchQueries: [
            GET_CONVERSATIONS
        ],
    });

    useEffect(() => {
        if (fetchedUsers) {
            const users = fetchedUsers?.getAllUsers.filter((u) => u.id !== user.id);
            console.log('Got users', users);
            setAllUsers(users);
        }
    }, [fetchedUsers]);

    useEffect(() => {

        console.log('got conversation data', conversationData);

        if (conversationData) {
            // const users = data?.getAllUsers
            // filter out the logged-in user
            // const users = data?.getAllUsers.filter((u) => u.id !== user.id);
            console.log('got conversation data', conversationData?.getAllConversationsByUserId);
            if (conversationData?.getAllConversationsByUserId.length > 0 && !currentConversation) {
                const c = conversationData?.getAllConversationsByUserId[0];
                setConversation(c);
            }

            // setCurrentConversation(conversationData?.getAllConversationsByUserId[0]);
            // setAllUsers(users);
        }
    }, [conversationData]);





    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearchText(searchValue);

        // Filter users based on search text
        const filtered = allUsers.filter((user) =>
            user.username.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handleLogout = () => {
        Router.push("auth/logout");
    };

    const handleUserClick = (user: User) => {
        if (!addedUsers.includes(user)) {
            setAddedUsers([...addedUsers, user]);
            setSearchText("");
        }
    };

    const handleUserRemove = (user: User) => {
        const updatedUsers = addedUsers.filter((u) => u.id !== user.id);
        setAddedUsers(updatedUsers);
    };

    const handleCreateConversation = async () => {
        const ids = addedUsers.map((u) => u.id);
        ids.push(user.id);

        const name = addedUsers.length === 1 ? null : addedUsers.map((u) => u.username).join(', ');

        if (!name) {
            // check if conversation already exists with this user
            const existingConversation = conversationData?.getAllConversationsByUserId
                .find((c) =>
                    c.participantIds.length === 2
                    && c.participantIds[0] === addedUsers[0].id
                    && c.participantIds[1] === user.id
                );
            if (existingConversation) {
                setConversation(existingConversation);
                return;
            }
        }

        if (ids.length < 2) {
            alert('Please add at least one user');
            return;
        }



        try {
            const { data } = await createConversation({
                variables: {
                    input: {
                        participantIds: ids,
                        name: name,
                        owner_id: user.id,
                    }
                },
            });
            console.log('created new converasion', data?.createConversation);
            setAddedUsers([]);
        } catch (error) {
            console.log('error', error);
        }
    };

    const getConversationName = () => {
        if (currentConversation?.name) {
            return currentConversation.name;
        } else {
            // set the name to the first user in the conversation
            const firstUserId = currentConversation?.participantIds[0];
            return "Ingen samtaler endnu"

            // return firstUser?.username;
        }
    }




    return (
        <div className="flex h-screen">

            {sidebarVisible && (
                <div className={`${sidebarVisible ? "w-4/6" : "w-2/6"} p-2 bg-gray-200 sm:w-1/2 md:w-3/5 md:p-4`}>
                    {/* Logged-in user section */}
                    {/* Logged-in user section */}
                    <div className="flex items-center mt-auto mb-4 border-2 border-b-slate-50">
                        <div className="flex items-center flex-grow mb-4">
                            <div className="flex items-center flex-grow">
                                <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                                <div className="ml-2 text-gray-800">{user.username}</div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 ml-auto text-white rounded-md bg-slate-400"
                            >
                                Logout
                            </button>
                        </div>
                    </div>


                    {/* Search bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={searchText}
                            onChange={handleSearchChange}
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg"
                            placeholder="Search users"
                        />
                    </div>

                    {/* Search results */}
                    {filteredUsers.length > 0 && searchText.length > 0 && (
                        <div className="absolute w-1/4 bg-white border border-gray-400 rounded-lg shadow-md ">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleUserClick(user)}
                                >
                                    {user.username}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Added users */}
                    <div className={`flex flex-wrap flex-row ${addedUsers.length ? "mb-4" : ""} `} >
                        {addedUsers.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center px-3 py-1 mr-2 bg-green-500 rounded-lg"
                            >
                                <span className="mr-1 text-white ">{user.username}</span>
                                <button
                                    className="font-bold text-white"
                                    onClick={() => handleUserRemove(user)}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add new conversation button */}
                    <div className="flex items-center justify-center h-12 text-white bg-blue-500 rounded-md cursor-pointer"
                        // onClick={handleUserClick}
                        onClick={handleCreateConversation}
                    >
                        Start New Conversation
                    </div>





                    {/* Conversation list */}
                    <div className='' >
                        {
                            conversationData?.getAllConversationsByUserId.map((conversation) => (
                                <div key={conversation.id} className={` flex items-center cursor-pointer px-2 py-2 mt-4 mb-6 ${conversation.id === currentConversation?.id && "bg-gray-100 rounded-lg"}`}
                                    onClick={() => setConversation(conversation)}
                                >
                                    <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
                                    <div className="ml-4">
                                        <div className="h-6 text-lg font-bold text-gray-800 whitespace-nowrap"> {conversation.name}</div>
                                        <div className="w-12 h-4 ">Beskeder</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

            )}

            {/* Chat messages */}
            {/* header */}
            <div className="flex flex-col w-full h-screen p-4 bg-white">

                <div className={`flex items-center w-full pb-3 mb-6 border-b-2`}>

                    <div className="w-12 h-12 bg-gray-400 rounded-full"

                        onClick={() => setSidebarVisible(!sidebarVisible)}
                    ></div>
                    <div className="ml-4">
                        <div className="h-6 text-lg font-bold text-gray-800">{getConversationName()}</div>
                    </div>

                </div>
                <ChatMessages
                    conversation={currentConversation} user={user}
                    refreshConversation={(b) => {
                        if (b) {
                            console.log('refreshing conversation');
                            // setConversation(undefined);
                            refetchConversations();
                        }
                    }}

                />
            </div>
        </div>
    )
}

// export a layout
Chat.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <Head>
                <title>Chat</title>
            </Head>
            {page}
        </>
    );
};


export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
    try {
        const user = await verifyUser({ req, res })
        return { props: { user: user } }
    } catch (err) {
        console.error('got error', err)
        return { props: { initialLoginStatus: 'Not logged in' } }
    }
}