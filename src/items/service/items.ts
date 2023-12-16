// src/items/items.service.ts

// data model interfaces

import { BaseItem, Item } from "../interface/item";
import { Items } from "../interface/items";
import * as ChainList from 'viem/chains';

var chainlist = []
var id_counter = 0;

for(var i in Object.keys(ChainList))
    chainlist.push({id: id_counter++, meta: Object.values(ChainList)[i]});
// in memory store
let items: Items = chainlist as any[]
// services

export const findAll = async (): Promise<Item[]> => Object.values(items);

export const find = async (id: number): Promise<Item> => items[id];

export const create = async (newItem: BaseItem): Promise<Item> => {
  const id = new Date().valueOf();

  items[id] = {
    id,
    ...newItem,
  };

  return items[id];
};

export const update = async (
  id: number,
  itemUpdate: BaseItem
): Promise<Item | null> => {
  const item = await find(id);

  if (!item) {
    return null;
  }

  items[id] = { id, ...itemUpdate };

  return items[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const item = await find(id);

  if (!item) {
    return null;
  }

  delete items[id];
};

export const search = async (word: string, testnet: string | undefined): Promise<Item[]> => {
  console.log(word)
  console.log(testnet)
  return [];
};

