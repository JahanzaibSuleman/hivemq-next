"use client"

import React, { useState, useEffect } from 'react';
import mqtt, { IClientOptions } from 'mqtt';
import { useClient } from '@/contexts/MqttClientContext';
import { inputClassName, buttonClassName } from './classNameStrings';

const MqttClient: React.FC = () => {
    const { client, updateClient } = useClient();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const handleOnConnect = () => {
            console.log('Connected to MQTT broker');
            setIsConnected(true);
        }

        const handleOnError = (error: Error) => {
            console.log(error);
        }

        client?.on('connect', handleOnConnect);

        client?.on('error', handleOnError);

        return () => {
            client?.off('connect', handleOnConnect);
            client?.off('error', handleOnError);
        }
    }, [client]);

    const handleConnect = (hostname: string, username: string, password: string, port: string) => {
        updateClient(mqtt.connect(`wss://${hostname}:${port}/mqtt`,
            {
                username,
                password,
                clientId: "mqttjs2_" + Math.random().toString(16).substring(2, 8)
            } as IClientOptions));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);
        const hostname = data.get('hostname')?.toString() || '';
        const username = data.get('username')?.toString() || '';
        const password = data.get('password')?.toString() || '';
        const port = data.get('port')?.toString() || '';

        handleConnect(hostname, username, password, port);
    }

    return (
        <div className="m-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <input type="text"
                        name="hostname"
                        className={inputClassName}
                        placeholder="Host name"
                        required
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        name="username"
                        className={inputClassName}
                        placeholder="Username"
                        required
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        name="password"
                        className={inputClassName}
                        required
                        placeholder="Password"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="string"
                        name="port" className={inputClassName}
                        placeholder="Port"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`${buttonClassName} ${isConnected && 'dark:bg-green-500 dark:hover:bg-green-500 cursor-not-allowed'}`}
                    disabled={isConnected}>
                    {isConnected ? 'Connected' : 'Connect'}
                </button>
            </form>
        </div>
    );
};

export default MqttClient;
