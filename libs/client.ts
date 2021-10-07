import { createClient } from 'microcms-js-sdk';

export const client = createClient({
    serviceDomain: 'laprn',
    apiKey: process.env.API_KEY,
});