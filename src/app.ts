import buildServer from "./server";

export const server = buildServer();

async function main() {
    try {
        const HOST = '0.0.0.0'
        const PORT = 3000
        await server.listen(PORT, HOST)
        console.log(`Server ready at http://${HOST}:${PORT}`)

    } catch (e) {
        console.error(e)
        process.exit(1);
    }
}

main()