/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images : {
    domains:[
      // 'bayut-production.s3.eu-central-1.amazonaws.com',
      "127.0.0.1",
  
    ]
  }

}

module.exports = nextConfig
