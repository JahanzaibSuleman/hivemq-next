"use client"

import React, { useState, useEffect } from 'react';
import { useClient } from '@/contexts/MqttClientContext';

interface MessageBody {
    topic: string;
    message: string;
}

const MqttMessage: React.FC = () => {
    const { client } = useClient();
    const [messagesBody, setMessagesBody] = useState<MessageBody[]>([]);

    useEffect(() => {

        const handleMessage = (topic: string, message: string) => {
            // called each time a message is received
            console.log('Received message:', topic, message.toString());

            setMessagesBody((prevMessagesBody) => [...prevMessagesBody,
            {
                topic,
                message: message.toString()
            }]);
        }

        client?.on('message', handleMessage);
        return () => {
            client?.off('message', handleMessage);
        }
    }, [client])

    return (
        <div className="m-5 overflow-auto h-48">
            <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                {messagesBody.map((messageBody, index) =>
                    <div key={index} className="flex flex-col pb-3">
                        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{messageBody.topic}</dt>
                        <dd className="text-lg font-semibold">{messageBody.message}</dd>
                    </div>
                )}
            </dl>
        </div>
    );
};

export default MqttMessage;
