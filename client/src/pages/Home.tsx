import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolCard from '@/components/ToolCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSEO, useStructuredData } from '@/hooks/useSEO';
import {
  TextCursorInput,
  Search,
  Share2,
  FileCog,
  Wand2,
  FileSliders,
  FileImage,
  Minimize2,
  SpellCheck2,
  Ruler,
  Pilcrow,
} from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // SEO
  useSEO({
    title: t('site.title'),
    description: t('site.description'),
    image: 'https://yuchani.com/wp-content/uploads/2025/10/웹툴.webp',
    url: window.location.href,
    type: 'website',
    keywords: 'web tools, productivity, SEO tools, PDF tools, image tools, text tools, online tools',
  });

  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Yuchani Tools Pro',
    url: window.location.href,
    description: t('site.description'),
    inLanguage: i18n.language,
  });

  const seoTools = [
    {
      icon: TextCursorInput,
      title: t('tools.meta_length.name'),
      description: t('tools.meta_length.description'),
      tags: [t('tags.seo')],
      href: '#',
      iconColor: 'text-indigo-300',
      tagColor: 'bg-indigo-400/15 border-indigo-400/30 text-indigo-200',
    },
    {
      icon: Search,
      title: t('tools.serp_preview.name'),
      description: t('tools.serp_preview.description'),
      tags: [t('tags.seo')],
      href: '#',
      iconColor: 'text-indigo-300',
      tagColor: 'bg-indigo-400/15 border-indigo-400/30 text-indigo-200',
    },
    {
      icon: Share2,
      title: t('tools.og_preview.name'),
      description: t('tools.og_preview.description'),
      tags: [t('tags.seo')],
      href: '#',
      iconColor: 'text-indigo-300',
      tagColor: 'bg-indigo-400/15 border-indigo-400/30 text-indigo-200',
    },
    {
      icon: FileCog,
      title: t('tools.robots_sitemap.name'),
      description: t('tools.robots_sitemap.description'),
      tags: [t('tags.seo')],
      href: '#',
      iconColor: 'text-indigo-300',
      tagColor: 'bg-indigo-400/15 border-indigo-400/30 text-indigo-200',
    },
  ];

  const mediaTools = [
    {
      icon: Wand2,
      title: t('tools.background_remover.name'),
      description: t('tools.background_remover.description'),
      tags: [t('tags.ai')],
      href: '#',
      iconColor: 'text-violet-300',
      tagColor: 'bg-violet-400/15 border-violet-400/30 text-violet-200',
    },
    {
      icon: FileSliders,
      title: t('tools.pdf_rotate.name'),
      description: t('tools.pdf_rotate.description'),
      tags: [t('tags.best')],
      href: '#',
      iconColor: 'text-rose-300',
      tagColor: 'bg-amber-400/15 border-amber-400/30 text-amber-200',
    },
    {
      icon: FileImage,
      title: 'PDF Image Converter',
      description: 'Convert PDF to clear images.',
      tags: [t('tags.workflow')],
      href: '#',
      iconColor: 'text-rose-300',
      tagColor: 'bg-lime-400/15 border-lime-400/30 text-lime-200',
    },
    {
      icon: Minimize2,
      title: 'AI Image Optimizer',
      description: 'Reduce file size while maintaining quality.',
      tags: [t('tags.workflow')],
      href: '#',
      iconColor: 'text-violet-300',
      tagColor: 'bg-lime-400/15 border-lime-400/30 text-lime-200',
    },
  ];

  const contentTools = [
    {
      icon: SpellCheck2,
      title: t('tools.korean_proofread.name'),
      description: t('tools.korean_proofread.description'),
      tags: [t('tags.ai')],
      href: '#',
      iconColor: 'text-amber-300',
      tagColor: 'bg-violet-400/15 border-violet-400/30 text-violet-200',
    },
    {
      icon: Ruler,
      title: t('tools.text_metrics.name'),
      description: t('tools.text_metrics.description'),
      tags: [t('tags.korean')],
      href: '#',
      iconColor: 'text-amber-300',
      tagColor: 'bg-rose-400/15 border-rose-400/30 text-rose-200',
    },
    {
      icon: Pilcrow,
      title: 'Case Converter',
      description: 'Convert text case instantly.',
      tags: [t('tags.basic')],
      href: '#',
      iconColor: 'text-amber-300',
      tagColor: 'bg-slate-400/15 border-slate-400/30 text-slate-200',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border">
          <div className="container py-20 md:py-28 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {t('hero.title')}
            </h1>

            <div className="mt-4 mb-8">
              <div className="inline-flex items-center justify-center gap-2">
                <span className="text-3xl md:text-4xl font-bold text-cyan-500">
                  Yuchani Tools
                </span>
                <span className="px-2 py-0.5 rounded-md text-xs font-black uppercase tracking-wider bg-white text-black">
                  PRO
                </span>
              </div>
              <div className="mt-2 h-0.5 w-full max-w-xs mx-auto rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-500 opacity-70"></div>
            </div>

            <p className="mt-8 text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl mx-auto">
              {t('hero.description')}
            </p>

            {/* Search Bar */}
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder={t('hero.search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 text-base"
                />
                <Button size="lg" className="px-8">
                  {t('hero.search_button')}
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground/50">
              <span>✨ {t('hero.features.pinned')}</span>
              <span>📱 {t('hero.features.responsive')}</span>
            </div>
          </div>
        </section>

        {/* Tools Sections */}
        <section className="container py-16 space-y-16">
          {/* SEO & Marketing */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-5">
              {t('categories.seo')} 📈
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {seoTools.map((tool, idx) => (
                <ToolCard key={idx} {...tool} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <a href="#" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
                More SEO Tools →
              </a>
            </div>
          </div>

          {/* PDF & Image */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-5">
              {t('categories.media')} 🖼️
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {mediaTools.map((tool, idx) => (
                <ToolCard key={idx} {...tool} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <a href="#" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
                More PDF/Image Tools →
              </a>
            </div>
          </div>

          {/* Content & Text */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-5">
              {t('categories.content')} ✍️
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {contentTools.map((tool, idx) => (
                <ToolCard key={idx} {...tool} />
              ))}
            </div>
            <div className="mt-6 text-center">
              <a href="#" className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
                More Content Tools →
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
