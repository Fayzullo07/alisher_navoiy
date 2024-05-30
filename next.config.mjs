import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.devdojo.com",
      "cruip-tutorials.vercel.app",
      "images.pexels.com",
      "flowbite.s3.amazonaws.com",
      "images.ctfassets.net",
      "etimg.etb2bimg.com",
      "ngoshivam.org",
      "nojhanco.ir",
      "cdn.filestackcontent.com",
      "source.unsplash.com",
    ],
  },
};

export default withNextIntl(nextConfig);
