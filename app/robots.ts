import type { MetadataRoute } from 'next'
 
const robots = () : MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: ['/','/login','/signup'],
      disallow: ['/credentials','/endpoints'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
  }
};

export default robots;