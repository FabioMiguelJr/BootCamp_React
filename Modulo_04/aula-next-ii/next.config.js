/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["assets.coingecko.com"],
	},
	i18n: {
		locales: ["pt", "en"],
		defaultLocale: "pt",
	},
};

module.exports = nextConfig;
