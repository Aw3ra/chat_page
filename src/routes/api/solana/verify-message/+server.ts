import type { RequestEvent } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import nacl from 'tweetnacl';
import bs58 from 'bs58';

import { JWT_SECRET } from "$env/static/private";
import { env } from "$env/dynamic/public";

const {
    PUBLIC_COLLECTION_MINT = "",
    PUBLIC_RPC_URL
} = env;

export async function POST({ request }: RequestEvent) {
    const {
        message = "",
        publicKey = "",
        signature = "",
    } = await request.json();

    const verifiedMessage = nacl
        .sign
        .detached
        .verify(
            new TextEncoder().encode(message),
            bs58.decode(signature),
            bs58.decode(publicKey)
        );
 
    const verifiedToken = jwt.verify(message, JWT_SECRET);

    if(!verifiedToken) {
        throw new Error("Invalid token");
    }

    if(!verifiedMessage) {
        throw new Error("Invalid message");
    }

    return json({
        data: true,
    });
}