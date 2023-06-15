import { MqttClient } from 'mqtt';
import { createContext, useContext, useState, ReactNode } from 'react';

interface ClientContextType {
    client: MqttClient | undefined;
    updateClient: (value: MqttClient) => void;
}

const ClientContext = createContext<ClientContextType>({
    client: undefined,
    updateClient: () => { },
});

export function useClient(): ClientContextType {
    return useContext(ClientContext);
}

interface ClientProviderProps {
    children: ReactNode;
}

export function ClientProvider({ children }: ClientProviderProps) {
    const [client, setClient] = useState<MqttClient>();

    const updateClient = (value: MqttClient) => {
        setClient(value);
    }

    const value: ClientContextType = {
        client,
        updateClient,
    };

    return (
        <ClientContext.Provider value={value}>
            {children}
        </ClientContext.Provider>
    );
}