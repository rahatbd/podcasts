import fetch from 'node-fetch';

async function handler(event) {
    try {
        const { param } = event.queryStringParameters;
        const response = await fetch(
            //----- DEVELOPMENT -----//
            // `https://listen-api-test.listennotes.com/api/v2/${param}`

            //----- PRODUCTION -----//
            `https://listen-api.listennotes.com/api/v2/${param}`,
            {
                headers: {
                    'X-ListenAPI-Key': process.env.API_KEY,
                },
            }
        );
        const { ok, status, statusText } = response;
        if (!ok) {
            console.error(`Status: ${status} ${statusText}`);
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
        return {
            statusCode: 500,
            body: error.toString(),
        };
    }
}

export { handler };
