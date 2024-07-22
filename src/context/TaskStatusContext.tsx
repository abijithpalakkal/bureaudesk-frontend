import React, { useState, createContext, ReactNode, Dispatch, SetStateAction } from "react";

interface IPostContext {
    statusDetails: any;
    setStatusDetails: Dispatch<SetStateAction<any>>;
}

export const TaskStatusContext = createContext<IPostContext | null>(null);

interface PostProps {
    children: ReactNode;
}

const TaskStatusProvider: React.FC<PostProps> = ({ children }) => {
    const [statusDetails, setStatusDetails] = useState<any>(null);

    const contextValue: IPostContext = {
        statusDetails,
        setStatusDetails
    };

    return (
        <TaskStatusContext.Provider value={contextValue}>
            {children}
        </TaskStatusContext.Provider>
    );
};

export default TaskStatusProvider;
