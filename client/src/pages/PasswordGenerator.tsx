import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useSEO, useStructuredData } from '@/hooks/useSEO';
import { Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function PasswordGenerator() {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  // SEO
  useSEO({
    title: 'Password Generator - Yuchani Tools Pro',
    description: 'Generate secure, random passwords with customizable options. Create strong passwords for your accounts.',
    url: window.location.href,
    type: 'WebApplication',
  });

  useStructuredData({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Password Generator',
    description: 'Generate secure, random passwords with customizable options.',
    url: window.location.href,
  });

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (useUppercase) chars += uppercase;
    if (useLowercase) chars += lowercase;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;

    if (chars === '') {
      toast.error('Select at least one character type');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast.success('Password copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Password Generator</h1>
          <p className="text-foreground/60 mb-8">
            Create strong, secure passwords with customizable options to protect your accounts.
          </p>

          <Card className="p-6 mb-6">
            {/* Password Display */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Generated Password</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={password}
                  readOnly
                  className="font-mono text-lg"
                  placeholder="Click 'Generate' to create a password"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="icon"
                  disabled={!password}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Length */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">
                Password Length: {length}
              </label>
              <input
                type="range"
                min="8"
                max="128"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex gap-2 mt-2 text-xs text-foreground/60">
                <span>8</span>
                <span className="flex-1"></span>
                <span>128</span>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="uppercase"
                  checked={useUppercase}
                  onCheckedChange={(checked) => setUseUppercase(checked as boolean)}
                />
                <label htmlFor="uppercase" className="text-sm cursor-pointer">
                  Include Uppercase (A-Z)
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="lowercase"
                  checked={useLowercase}
                  onCheckedChange={(checked) => setUseLowercase(checked as boolean)}
                />
                <label htmlFor="lowercase" className="text-sm cursor-pointer">
                  Include Lowercase (a-z)
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="numbers"
                  checked={useNumbers}
                  onCheckedChange={(checked) => setUseNumbers(checked as boolean)}
                />
                <label htmlFor="numbers" className="text-sm cursor-pointer">
                  Include Numbers (0-9)
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="symbols"
                  checked={useSymbols}
                  onCheckedChange={(checked) => setUseSymbols(checked as boolean)}
                />
                <label htmlFor="symbols" className="text-sm cursor-pointer">
                  Include Symbols (!@#$%^&*)
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generatePassword}
              size="lg"
              className="w-full gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Generate Password
            </Button>
          </Card>

          {/* Tips */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="font-semibold mb-3">Tips for Strong Passwords</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>✓ Use at least 12 characters for better security</li>
              <li>✓ Mix uppercase, lowercase, numbers, and symbols</li>
              <li>✓ Avoid using personal information or common words</li>
              <li>✓ Use unique passwords for different accounts</li>
              <li>✓ Consider using a password manager to store them securely</li>
            </ul>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
