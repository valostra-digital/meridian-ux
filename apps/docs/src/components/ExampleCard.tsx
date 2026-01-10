import { useState } from 'react';
import { Code, Copy, Check, Terminal } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { clsx } from 'clsx';

interface ExampleCardProps {
  id: string;
  title: string;
  description?: string;
  code: string;
  componentName: string;
}

export function ExampleCard({ id, title, description, code, componentName }: ExampleCardProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id={id} className="scroll-mt-24 border border-border rounded-lg bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Preview Area */}
      <div className="p-8 md:p-12 flex items-center justify-center bg-muted/10 border-b border-border min-h-[160px]">
        {/* Render the web component string directly. 
            React 19/Canary supports custom elements but rendering raw HTML string needs danger.
            Alternatively, we can parse it, but for examples, dangerouslySetInnerHTML is acceptable 
            as content is static from our own docs. 
        */}
        <div
          className="w-full flex flex-wrap gap-4 items-center justify-center"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </div>

      {/* Meta Area */}
      <div className="bg-card">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <div className="font-medium text-sm text-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
            {title}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="p-2 rounded-md hover:bg-muted text-muted-foreground transition-colors"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowCode(!showCode)}
              className={clsx(
                "p-2 rounded-md hover:bg-muted transition-colors",
                showCode ? "text-primary bg-primary/10" : "text-muted-foreground"
              )}
              title={showCode ? "Hide code" : "Show code"}
            >
              <Code className="w-4 h-4" />
            </button>
          </div>
        </div>

        {description && (
          <div className="px-6 py-4 text-sm text-muted-foreground border-b border-border/50 bg-muted/5">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        )}

        {/* Code Area */}
        {showCode && (
          <div className="border-t border-border animate-in slide-in-from-top-2 duration-200">
            <CodeBlock code={code} className="rounded-none border-none" />
          </div>
        )}
      </div>
    </div>
  );
}
