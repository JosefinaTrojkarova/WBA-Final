export default {
    build: {
        rollupOptions: {
            input: {
                main: "main.js",
                alt: "other.js",
                'index.html': "index.html",
            },
        },
    },
}