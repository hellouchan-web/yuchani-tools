import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Send, MessageCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const { t } = useTranslation();
  const { language, setLanguage, languages } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">YT</span>
              </div>
              <div className="font-semibold">{t('footer.brand')}</div>
            </div>
            <p className="text-sm text-foreground/60">
              {t('footer.description')}
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3">{t('footer.resources')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">{t('footer.guides')}</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">{t('footer.changelog')}</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">{t('footer.cookies')}</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">{t('footer.sitemap')}</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-3">{t('footer.connect')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://yuchani.com" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {t('footer.website')}
                </a>
              </li>
              <li>
                <a href="https://t.me/Yuchani_x" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  {t('footer.telegram')}
                </a>
              </li>
              <li>
                <a href="https://open.kakao.com/me/yuchani_x" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {t('footer.kakao')}
                </a>
              </li>
              <li>
                <a href="https://qr.kakaopay.com/FcRGwQ7nE" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  {t('footer.donate')}
                </a>
              </li>
            </ul>
          </div>

          {/* Language */}
          <div>
            <h3 className="font-semibold mb-3">{t('footer.language')}</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  variant={language === lang.code ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLanguage(lang.code)}
                  className="text-xs"
                >
                  {lang.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-6 text-center text-xs text-foreground/50">
          {t('footer.copyright', { year })}
        </div>
      </div>
    </footer>
  );
}
