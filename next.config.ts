import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/2015/03/26/amenajari-radiologice-profesionale",
        destination: "/radioprotectie-plumbare-rx",
        permanent: true,
      },
      {
        source: "/ce-am-facut-copy",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ce-facem",
        destination: "/service-aparatura-medicala",
        permanent: true,
      },
      {
        source: "/mentenanta-service",
        destination: "/service-aparatura-medicala",
        permanent: true,
      },
      {
        source: "/project/eccleston-vs-draper",
        destination: "/",
        permanent: true,
      },
      {
        source: "/project/zes-zn10-robot-curatenie-profesional-copy-copy",
        destination: "/",
        permanent: true,
      },
      {
        source: "/shop/polo",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
