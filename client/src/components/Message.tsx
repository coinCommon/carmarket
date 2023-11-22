import React, {FC} from 'react';

interface MessageListProps {
    message: string
}

const Message: FC<MessageListProps> = ({message}) => {
    return (
        <div style={{width: '100%', height: window.innerHeight, position: 'absolute', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h2>{message}</h2>
        </div>
    );
};

export default Message;