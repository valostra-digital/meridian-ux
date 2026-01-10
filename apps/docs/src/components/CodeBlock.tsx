import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { clsx } from 'clsx';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = 'html', className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={clsx("relative group rounded-lg bg-slate-950", className)}>
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-2 rounded-md bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
        title="Copy code"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </button>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-blue-100 leading-relaxed">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
