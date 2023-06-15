import { Inter } from 'next/font/google'
import MqttClient from '@/components/MqttConnect'
import { ClientProvider } from '@/contexts/MqttClientContext'
import MqttSubscribe from '@/components/MqttSubscribe'
import MqttPublish from '@/components/MqttPublish'
import MqttMessage from '@/components/MqttMessage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen items-center justify-center flex-col flex-wrap p-24 ${inter.className}`}
    >
      <ClientProvider>
        <div className='grid grid-cols-2'>
          <MqttClient />
          <MqttSubscribe />
        </div>
        <div className='grid grid-cols-2'>
          <MqttPublish />
          <MqttMessage />
        </div>
      </ClientProvider>
    </main>
  )
}
