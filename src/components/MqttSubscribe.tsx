"use client"

import React, { useCallback, useState } from 'react';
import { useClient } from '@/contexts/MqttClientContext';
import { inputClassName, buttonClassName } from './classNameStrings';

const MqttSubscribe: React.FC = () => {
    const { client } = useClient();
    const [subsciptions, setSubscriptions] = useState<string[]>([]);

    const handleSubscribe = useCallback((topic: string) => {
        client?.subscribe(topic);
        setSubscriptions(
            (prevSubscriptions) => [...prevSubscriptions, topic]
        );
    }, [client]);

    const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);
        const topic = data.get('topic')?.toString() || '';

        handleSubscribe(topic);
    }, [handleSubscribe]);

    return (
        <div className="m-5">
            <form className="mb-5" onSubmit={handleSubmit}>
                <div className="mb-6">
                    <input type="text" name="topic" className={inputClassName} placeholder="Subscribe to a topic" required />
                </div>
                <button type="submit" className={buttonClassName}>Subscribe</button>
            </form>
            <ol className="max-w-md space-y-1 overflow-auto h-48 text-gray-500 list-decimal list-inside dark:text-gray-400">
                {subsciptions.map((subscription, index) =>
                    <li key={index}>
                        <span className="font-semibold text-gray-900 dark:text-white">{subscription}</span>
                    </li>
                )}
            </ol>
        </div>
    );
};

export default MqttSubscribe;
