import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "botw-compendium.herokuapp.com",
				port: "",
				pathname: "/api/v3/compendium/entry/**"
			}
		]
	}
};

export default nextConfig;
