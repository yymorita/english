import { createClient } from 'microcms-js-sdk';
import * as dotenv from 'dotenv'

dotenv.config()

export const client = createClient({
    serviceDomain: 'laprn',
    apiKey: process.env.API_KEY
});