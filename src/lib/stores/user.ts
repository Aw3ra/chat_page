import { writable } from "svelte/store";
import { postRequest } from "$lib/utility";
import type { userDetails } from "$lib/types";

// Utility function for delaying execution
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initial user state structure
const initialUserState = {
    loading: false,
    error: false,
    data: null as userDetails | null,
};

function createUserStore() {
    const { subscribe, set, update } = writable(initialUserState);

    async function doFetchUser(publicKey: string) {
        update(state => ({ ...state, loading: true }));
        try {
            let response = await postRequest("/api/database/user/find", { pubkey: publicKey });
            if (response.status !== 200) {
                response = await postRequest("/api/database/user/create", { pubkey: publicKey });
            }
            update(state => ({ ...state, data: response.body }));
        } catch (error) {
            console.error("Error fetching/creating user:", error);
            update(state => ({ ...state, error: true }));
        } finally {
            update(state => ({ ...state, loading: false }));
        }
    }

    async function fetchUser(publicKey: string, retries: number = 2) {
        try {
            await doFetchUser(publicKey);
        } catch (error) {
            if (retries > 0) {
                await wait(1500);
                fetchUser(publicKey, retries - 1);
            } else {
                console.error("Final error after retries:", error);
            }
        }
    }

    async function createThread(content: string, publicKey: string, assistant: string) {
        try {
            const thread = await postRequest("/api/database/conversations/create", { content, assistant });
            const date = new Date();
            update(state => {
                if (state.data) {
                    state.data.conversations.push(
                        {
                            id: thread.body,
                            created: date,
                            name: date.toLocaleString(),
                        });
                }
                return state;
            });
            await updateUserConversations(publicKey);
            return thread.body;
        } catch (error) {
            console.error("Error creating thread:", error);
        }
    }

    async function deleteThread(threadId: string, publicKey: string) {
        update(state => {
            if (state.data) {
                for (var i = 0; i < state.data.conversations.length; i++) {
                    if (state.data.conversations[i].id === threadId) {
                        state.data.conversations.splice(i, 1);
                        break;
                    }
                }
            }
            return state;
        });
        await updateUserConversations(publicKey);    
    }

    async function editThread(threadId: string, publicKey: string, newName: string) {
        update(state => {
            if (state.data) {
                for (var i = 0; i < state.data.conversations.length; i++) {
                    if (state.data.conversations[i].id === threadId) {
                        state.data.conversations[i].name = newName;
                        break;
                    }
                }
            }
            return state;
        });
        await updateUserConversations(publicKey);    
    }


    async function updateUserConversations(publicKey: string) {
        try {
            await postRequest("/api/database/user/update", {
                pubkey: publicKey,
                data: get().data,
            });
        } catch (error) {
            console.error("Error updating user conversations:", error);
        }
    }

    async function fetchConversation(threadId: string) {
        try {
            const thread = await postRequest("/api/openai/fetchConvo", { threadId: threadId });
            return thread.body;
        } catch (error) {
            console.error("Error fetching conversation:", error);
        }
    }

    // Helper function to get current state
    function get() {
        let state;
        update(_ => (state = _));
        return state;
    }

    return {
        subscribe,
        fetchUser,
        createThread,
        updateUserConversations,
        fetchConversation,
        deleteThread,
        editThread,
        get,
    };
}

export const user = createUserStore();
