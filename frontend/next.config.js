/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                hostname: '*',
            },
        ],
        dangerouslyAllowSVG: true,
    },
    webpack(config, { isServer }) {
        config.module.rules.push(
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/_next/static/fonts',
                        outputPath: 'static/fonts',
                    },
                },
            },
        );

        return config;
    },

};

module.exports = nextConfig;
