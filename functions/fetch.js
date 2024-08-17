// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
// const handler = async event => {
//     try {
//         const subject = event.queryStringParameters.name || 'World';
//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: `Hello ${subject}` }),
//             // // more keys you can return:
//             // headers: { "headerName": "headerValue", ... },
//             // isBase64Encoded: true,
//         };
//     } catch (error) {
//         return { statusCode: 500, body: error.toString() };
//     }
// };

// module.exports = { handler };

import fetch from 'node-fetch';

/* eslint-env node */
const API_KEY = process.env.API_KEY;
const URL_BASE = 'https://listen-api.listennotes.com/api/v2';
// const URL_TEST = 'https://listen-api-test.listennotes.com/api/v2';

async function handler(event) {
    try {
        const { param } = event.queryStringParameters;
        if (!param) {
            console.error('Status: 400 - Missing Query Parameters.');
            return {
                statusCode: 400,
                body: 'Missing Query Parameters.',
            };
        }
        const response = await fetch(`${URL_BASE}/${param}`, {
            headers: {
                'X-ListenAPI-Key': API_KEY,
            },
        });
        // const response = await fetch(`${URL_TEST}/${param}`);
        const { ok, status, statusText } = response;
        if (!ok) {
            console.error(`Status: ${status} - ${statusText}.`);
            return {
                statusCode: status,
                body: statusText,
            };
        }
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error(error);
        const { statusCode: status = 500 } = error;
        return {
            statusCode: status,
            body: error.toString(),
        };
    }
}

export { handler };
