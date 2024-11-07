export const info = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de users',
            version: '1.0.0',
            description: 'API de users',
        },
        servers: [
            {
                url: 'http://localhost:8080/'
            }
        ]
    },
    apis: ["./src/docs/*.yml"],
}