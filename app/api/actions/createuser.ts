"use server";

import { prisma } from "@/lib/prisma";

export const upsertUser = async (
    email: string,
    id: string,
    walletAddress: string
) => {
    const user = await prisma.user.upsert({
        where: { email: email },
        update: {}, // If the user exists, we don't update anything
        create: {
            id: id,
            email: email,
            walletAddress: walletAddress,
        },
    });

    return user;
};
