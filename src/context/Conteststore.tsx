import React, { useContext, useState, createContext, ReactNode, Dispatch, SetStateAction } from "react";

interface IPostContext {
    postdetails: any,
    setpostdetails: Dispatch<SetStateAction<any>>;
}

export const Postcontext = createContext<IPostContext | null>(null);

interface PostProps {
    children: ReactNode;
}

function Post({ children }: PostProps) {
    const [postdetails, setpostdetails] = useState<any>();

    const contextValue: IPostContext = {
        postdetails,
        setpostdetails
    };

    return (
        <Postcontext.Provider value={contextValue}>
            {children}
        </Postcontext.Provider>
    );
}

export default Post;
