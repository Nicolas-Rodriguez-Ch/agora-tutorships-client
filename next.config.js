/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'therminic2018.eu', 'url.zip'],
  }
}

module.exports = {
  sassOptions: {
    prependData: `@import "./styles/global.scss";`,
  },
};

module.exports = nextConfig