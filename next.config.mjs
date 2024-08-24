import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";

const nextIntlFilePath = path.resolve(process.cwd(), "src", "i18n", "i18n.ts");

const withNextIntl = createNextIntlPlugin(nextIntlFilePath);

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
