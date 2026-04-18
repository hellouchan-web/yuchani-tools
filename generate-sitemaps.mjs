import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Base URL
const baseUrl = 'https://tools.yuchani.com';

// Languages
const languages = ['ko', 'en', 'ja', 'zh', 'es'];
const defaultLanguage = 'ko';

// Tool pages (same for all languages)
const tools = [
  'meta-length',
  'serp-preview',
  'og-preview',
  'robots-sitemap',
  'background-remover',
  'pdf-rotate',
  'pdf-to-image',
  'image-optimizer',
  'korean-proofread',
  'text-metrics',
  'case-converter',
  'dedupe',
  'code-formatter',
  'json-csv',
  'url-shortener',
  'qrcode',
  'color-contrast',
];

// Generate sitemap XML
function generateSitemap(lang = null) {
  const urls = [];

  // Home page
  if (lang) {
    urls.push({
      loc: `${baseUrl}/${lang}/`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 1.0,
    });
  } else {
    urls.push({
      loc: `${baseUrl}/`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: 1.0,
    });
  }

  // Tool pages
  tools.forEach((tool) => {
    if (lang) {
      urls.push({
        loc: `${baseUrl}/${lang}/tools/${tool}/`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.8,
      });
    } else {
      urls.push({
        loc: `${baseUrl}/tools/${tool}/`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: 0.8,
      });
    }
  });

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  if (!lang) {
    xml += ' xmlns:xhtml="http://www.w3.org/1999/xhtml"';
  }
  xml += '>\n';

  urls.forEach((url) => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;

    // Add hreflang for default language
    if (!lang) {
      languages.forEach((l) => {
        const toolMatch = url.loc.match(/\/tools\/([^/]+)\//);
        const toolPath = toolMatch ? `/tools/${toolMatch[1]}/` : '/';
        xml += `    <xhtml:link rel="alternate" hreflang="${l}" href="${baseUrl}/${l}${toolPath}"/>\n`;
      });
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${url.loc}"/>\n`;
    }

    xml += '  </url>\n';
  });

  xml += '</urlset>\n';
  return xml;
}

// Create sitemaps directory if it doesn't exist
const publicDir = path.join(__dirname, 'client', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate main sitemap (default language)
const mainSitemap = generateSitemap();
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), mainSitemap);
console.log('✓ Generated sitemap.xml');

// Generate language-specific sitemaps
languages.forEach((lang) => {
  const langSitemap = generateSitemap(lang);
  fs.writeFileSync(path.join(publicDir, `sitemap-${lang}.xml`), langSitemap);
  console.log(`✓ Generated sitemap-${lang}.xml`);
});

// Generate sitemap index
let sitemapIndex = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemapIndex += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
sitemapIndex += `  <sitemap>\n`;
sitemapIndex += `    <loc>${baseUrl}/sitemap.xml</loc>\n`;
sitemapIndex += `  </sitemap>\n`;

languages.forEach((lang) => {
  sitemapIndex += `  <sitemap>\n`;
  sitemapIndex += `    <loc>${baseUrl}/sitemap-${lang}.xml</loc>\n`;
  sitemapIndex += `  </sitemap>\n`;
});

sitemapIndex += '</sitemapindex>\n';
fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sitemapIndex);
console.log('✓ Generated sitemap-index.xml');

console.log('\n✅ All sitemaps generated successfully!');
