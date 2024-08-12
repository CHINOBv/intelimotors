/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins'],
                serif: ['Gilroy'],
                Poppins: ['Poppins'],
                PoppinsMed: ['PoppinsMed'],
                Gilroy: ['Gilroy'],
            },

            colors: {
                primary: '#0059ff',
                secondary: '#ff0059',
                black: '#000000',
                white: '#ffffff',
            }

        },
    },
    plugins: [],
}
