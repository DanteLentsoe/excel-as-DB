/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    EMAIL_JS_TEMPLATE_ID: process.env.EMAIL_JS_TEMPLATE_ID,
    EMAIL_JS_SERVICE_ID: process.env.EMAIL_JS_SERVICE_ID,
    EMAIL_JS_USER_ID: process.env.EMAIL_JS_USER_ID,
  },
};

export default nextConfig;
