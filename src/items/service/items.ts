// src/items/items.service.ts
import * as _ from "lodash";
console.log(_.padStart("Hello TypeScript!", 20, " "))
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

export const search = async (word: string, testnet: string | undefined): Promise<Items> => {
     /**
     * query: query string to match with
     * dataArray: data array variable, array or opject to search it
     **/
      function search(query: string,dataArray: Items){
        // search code go here
        //console.log(query);
        var matched: Item[] = [];
        //init null values
        if(!query)query='';
        const data = Object.entries(dataArray)
        data.forEach(function(obj: any,index){
           
             if(!obj.hasOwnProperty('1') || !obj['1']) return;
             if((obj['1']['meta']['id'].toString().indexOf(query) !== -1)
             || (obj['1']['meta']['name'].toString().indexOf(query) !== -1))
               {
                 matched.push(obj['1']);
               } 
           
        });
        return matched ;      
        }

  const i: Items = search(word, items)
  return i;
};

