// src/items/items.router.ts

import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'

// interfaces

import * as ItemService from "../service/items";
import { BaseItem, Item } from "../interface/item";
import { Elysia, t } from "elysia";

class CustomError extends Error {
    constructor(public message: string) {
        super(message)
    }
}

export const router  = new Elysia()
    .use(swagger())
    .use(cors()) // <-- add a specific IP and service, or use jwt/auth
    .onError(({ code, error }) => {
        return new Response(error.toString())
    })
    .get('/ping', () => 'pong')
    .group("api/v1/chainlist", app => {
        return app
        .get('/', async () => await ItemService.findAll())
        .post('/', async ({ body, set }) => {
            const newItem: Item = await ItemService.create(body as BaseItem);
            set.status = 200
            return new Response(newItem as any, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
        .delete("/:id", async ({ params }) => {
            try {
                await ItemService.remove(parseInt(params.id));
              return { success: true };
            } catch (e) {
              return { success: false };
            }
          })
        .get("/:id", async ({ params }) => {
            try {
              return  await ItemService.find(parseInt(params.id));
            } catch (e) {
              return { success: false };
            }
        })
        .get("/search/:word", async ({ params: { word }, query: { testnet } }) => {
          try {
            return await ItemService.search(word,testnet);
          } catch (e) {
            return { success: false };
          }
        }, {
          params: t.Object({
            word: t.String()
          }),
          query: t.Object({
              testnet: t.Optional(t.String())
          },
          {
            /**
             * @default false
             * Accept additional properties
             * that not specified in schema
             * but still match the type
             */
            additionalProperties: true
          })})
    })
    .get('/', () => {
		  throw new CustomError('Hello Error, use /swagger to see all APIs');
    })
    

