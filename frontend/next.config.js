const withMDX = require("@next/mdx")();

function checkEnvVar(envVarName) {
  console.log("Checking ", envVarName);
  if (typeof process.env[envVarName] === "undefined") {
    console.error(`Environment Var ${envVarName} is undefined.`);
    throw `Environment Var ${envVarName} is undefined.`;
  }
  if (
    envVarName.includes("PASSWORD") ||
    envVarName.includes("SECRET") ||
    envVarName.includes("KEY")
  ) {
    console.log("> Value Ommited");
  } else {
    console.log("> " + process.env[envVarName]);
  }
}

// function checkFileExists(filePath) {
//   if (fs.existsSync(filePath) === false) {
//     const msg = `Environment File ${filePath} is missing.`;
//     console.error(msg);
//     throw msg;
//   }
// }

//-----------------------------------
checkEnvVar("NEXTAUTH_URL");
checkEnvVar("NEXTAUTH_URL_INTERNAL");
checkEnvVar("NEXTAUTH_SECRET");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   allowMiddlewareResponseBody: true,
  // },
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    app_title: "Applicable.Ai",
    logo: "/images/Logo.svg",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

module.exports = withMDX(nextConfig);
