import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    async headers() {
        return [
            {
                source: "/sitemap.xml",
                headers: [
                    {
                        key: "Content-Type",
                        value: "application/xml",
                    },
                ],
            },
            {
                source: "/sitemap-:index.xml",
                headers: [
                    {
                        key: "Content-Type",
                        value: "application/xml",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
