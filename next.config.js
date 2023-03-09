/** @type {import('next').NextConfig} */
const withLess = require('next-with-less')
const nextConfig = withLess({
  reactStrictMode: true,
})

module.exports = nextConfig
