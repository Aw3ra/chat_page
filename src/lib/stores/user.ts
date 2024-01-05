import { writable, get } from "svelte/store";
import { postRequest } from "$lib/utility";

export const user = writable({
    id: null,
    name: null,
    email: null,
    image: null,
    accounts: [],
    sessions: [],
    conversations: [],
});

// Function to get the user from a session
export async function getUser(email: string) {
    const response = await postRequest("/api/database/user/find", { name: email });
    user.set(response.body);
    await getConversations(get(user).email||"");
}

// Function to get the conversations for the user
export async function getConversations(email: string) {
    const response = await postRequest("/api/database/conversations/find", { name: email });
    // Set the conversations to the response body
    user.update((u) => {
        u.conversations = response.body;
        return u;
    });
}
