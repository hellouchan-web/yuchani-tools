import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useSEO, useStructuredData } from '@/hooks/useSEO';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function ColorConverter() {
  const { t } = useTranslation();
  const [hexColor, setHexColor] = useState('#3B82F6');
  const [rgbColor, setRgbColor] = useState('59, 130, 246');
  const [hslColor, setHslColor] = useState('217, 97%, 60%');

  // SEO
  useSEO({
    title: 'Color Converter - Yuchani Tools Pro',
    description: 'Convert colors between HEX, RGB, and HSL formats instantly. Perfect for designers and developers.',
    url: window.location.href,
    type: 'WebApplication',
  });

  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Color Converter',
    description: 'Convert colors between HEX, RGB, and HSL formats.',
    url: window.location.href,
  });

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '';
  };

  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
  };

  const handleHexChange = (value: string) => {
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setHexColor(value);
      setRgbColor(hexToRgb(value));
      setHslColor(hexToHsl(value));
    } else if (value.length <= 7) {
      setHexColor(value);
    }
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${format} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Color Converter</h1>
          <p className="text-foreground/60 mb-8">
            Convert colors between HEX, RGB, and HSL formats instantly.
          </p>

          <Card className="p-6 mb-6">
            {/* Color Preview */}
            <div className="mb-6">
              <div
                className="w-full h-32 rounded-lg border-4 border-border shadow-md transition-all"
                style={{ backgroundColor: hexColor }}
              ></div>
            </div>

            {/* HEX */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">HEX</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={hexColor}
                  onChange={(e) => handleHexChange(e.target.value.toUpperCase())}
                  placeholder="#000000"
                  className="font-mono"
                />
                <Button
                  onClick={() => copyToClipboard(hexColor, 'HEX')}
                  variant="outline"
                  size="icon"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* RGB */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">RGB</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={`rgb(${rgbColor})`}
                  readOnly
                  className="font-mono"
                />
                <Button
                  onClick={() => copyToClipboard(`rgb(${rgbColor})`, 'RGB')}
                  variant="outline"
                  size="icon"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* HSL */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">HSL</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={`hsl(${hslColor})`}
                  readOnly
                  className="font-mono"
                />
                <Button
                  onClick={() => copyToClipboard(`hsl(${hslColor})`, 'HSL')}
                  variant="outline"
                  size="icon"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Color Palette */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Popular Colors</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
              {['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'].map((color) => (
                <button
                  key={color}
                  onClick={() => handleHexChange(color)}
                  className="w-full aspect-square rounded-lg border-2 border-border hover:border-foreground transition-colors"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
