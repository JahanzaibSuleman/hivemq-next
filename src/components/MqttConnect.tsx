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

    const handleConnect = (hostname: string, username: string, password: string) => {
        updateClient(mqtt.connect(
            {
                username,
                password,
                clientId: "mqttjs_" + Math.random().toString(16).substring(2, 8),
                protocol: 'wss',
                hostname,
                protocolVersion: 4,
                port: 8884,
                path: '/mqtt',
                clean: true,
                resubscribe: false,
                keepalive: 60,
                reconnectPeriod: 0,
            } as IClientOptions));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);
        const hostname = data.get('hostname')?.toString() || '';
        const username = data.get('username')?.toString() || '';
        const password = data.get('password')?.toString() || '';

        handleConnect(hostname, username, password);
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
