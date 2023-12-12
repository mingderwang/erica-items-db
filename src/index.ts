export const one = 1
export const two = 2
import { http, createPublicClient, webSocket } from 'viem'
import * as ChainList from 'viem/chains'
export * from './items'

const client = createPublicClient({
  chain: ChainList.mainnet,
  transport: http(),
})

const webSocketClient = createPublicClient({
  chain: ChainList.mainnet,
  transport: webSocket(
    'wss://eth-mainnet.g.alchemy.com/v2/4iIl6mDHqX3GFrpzmfj2Soirf3MPoAcH',
  ),
})

const bn = await client.getBlockNumber()
const bn2 = await webSocketClient.getBlockNumber()
console.log({ bn, bn2 })

