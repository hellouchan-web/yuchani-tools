import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
}

export function useSEO(config: SEOConfig) {
  useEffect(() => {
    // Title
    document.title = config.title;

    // Meta tags
    const updateMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    const updatePropertyTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Standard meta tags
    updateMetaTag('description', config.description);
    if (config.keywords) {
      updateMetaTag('keywords', config.keywords);
    }

    // Open Graph
    updatePropertyTag('og:title', config.title);
    updatePropertyTag('og:description', config.description);
    updatePropertyTag('og:type', config.type || 'website');
    if (config.url) {
      updatePropertyTag('og:url', config.url);
    }
    if (config.image) {
      updatePropertyTag('og:image', config.image);
    }

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', config.title);
    updateMetaTag('twitter:description', config.description);
    if (config.image) {
      updateMetaTag('twitter:image', config.image);
    }

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = config.url || window.location.href;
  }, [config]);
}

export function useStructuredData(data: Record<string, any>) {
  useEffect(() => {
    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }, [data]);
}
