export default {
    build: {
        rollupOptions: {
            input: {
                demo: "src/demo.js",
                lib: "lib.js",
                'index.html': "index.html",
            },
        },
    },
}