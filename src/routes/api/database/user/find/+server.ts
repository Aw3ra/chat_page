import { json } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";
import { SHDW_PUBKEY } from "$env/static/private";
import { decrypt } from "$lib/encryption";


// POST /api/user
export async function POST({ request }: RequestEvent) {
    try{
        const {pubkey} = await request.json()
        const url = `https://shdw-drive.genesysgo.net/${SHDW_PUBKEY}/${pubkey}.json`
        const response = await fetch (url)
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        let data = await response.json()

        // const { data, iv, tag} = await response.json()
        // const decrypted = decrypt(data, iv, tag)
        return json({
            status: 200,
            body: data,
        })
    }
    catch (error) {
        return json({
            status: 500,
            body: "User not found",
        })
    }

}

