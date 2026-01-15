"use client"

import { User } from "@/types/User";
import { createContext, ReactNode, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface UsersContextProps {
    userList: User[] | null
}
export const UsersContext = createContext<UsersContextProps | null>(null);

interface UsersProviderProps {
    children: ReactNode
}
export function UsersProvider({ children }: UsersProviderProps) {
    const [userList, setUserList] = useState<User[]>([]);

    useEffect(() => {
        const list: User[] = [];
        for (let i = 0; i <= 100; i++) {
            const uuid = uuidv4();
            const name = uuid.split("-")[4];

            setUserList((prev) => [...prev, {
                id: uuid,
                username: `User ${uuid.substring(0, 3)}`,
                role: i < 3 ? "ADMIN" : "USER",
                balance: Math.floor(Math.random() * 10000)
            }])
        }
    }, []);

    return (
        <UsersContext.Provider value={{ userList }}>
            {children}
        </UsersContext.Provider>
    );
}