// src/items/item.interface.ts
import type { Chain } from 'viem/chains'

export interface BaseItem {
  meta: Chain;
}

export interface Item extends BaseItem {
  id: number;
}
