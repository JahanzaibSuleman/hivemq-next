"use client"

import React from 'react';
import { useClient } from '@/contexts/MqttClientContext';
import { inputClassName, buttonClassName } from './classNameStrings';

const MqttPublish: React.FC = () => {
    const { client } = useClient();

    const handleSubscribe = (topic: string, message: string) => {
        client?.publish(topic, message);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);
        const topic = data.get('topic')?.toString() || '';
        const message = data.get('message')?.toString() || '';

        handleSubscribe(topic, message);
    }

    return (
        <div className="m-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <input type="text" name="topic" className={inputClassName} placeholder="Subscribe to a topic" required />
                </div>
                <div className="mb-6">
                    <input type="text" name="message" className={inputClassName} placeholder="Message" required />
                </div>
                <button type="submit" className={buttonClassName}>Publish Message</button>
            </form>
        </div>
    );
};

export default MqttPublish;
