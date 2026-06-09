import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gimaitaly.com",
        pathname: "/images/prodotti/**",
      },
      {
        protocol: "https",
        hostname: "gimaitaly.com",
        pathname: "/images/prodotti/**",
      },
    ],
  },
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
      {
        source: "/shop/cusca-faraday-structura-cupru-aluminiu",
        destination: "/amenajare-centre-imagistica",
        permanent: true,
      },
      {
        source:
          "/product-category/amenajari-radiologie-spatii/solutii-specifice-rmn-ecranare-rf",
        destination: "/amenajare-centre-imagistica",
        permanent: true,
      },
      {
        source: "/product-category/mobilier-medical/carucioare-urgenta",
        destination: "/service-aparatura-medicala",
        permanent: true,
      },
      {
        source: "/noutati",
        destination: "/knowledge-hub",
        permanent: true,
      },
      {
        source: "/telemedicine-or-in-person-care-whats-best",
        destination: "/knowledge-hub",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
