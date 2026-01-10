import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { clsx } from 'clsx';

interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description?: string;
  options?: string[]; // If enum
}

interface ComponentPlaygroundProps {
  componentName: string;
  description?: string;
  props: PropDefinition[];
  slots?: string[];
}

export function ComponentPlayground({ componentName, description, props }: ComponentPlaygroundProps) {
  // State for props values
  const [values, setValues] = useState<Record<string, any>>({});
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Initialize defaults
  useEffect(() => {
    const initial: Record<string, any> = {};
    props.forEach(p => {
      if (p.default) {
        // specific handling for booleans
        if (p.type === 'boolean') {
          initial[p.name] = p.default === 'true';
        } else {
          initial[p.name] = p.default.replace(/'/g, '');
        }
      }
    });
    setValues(initial);
  }, [componentName]);

  const handlePropChange = (name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  // Generate code snippet
  const generateCode = () => {
    const propStrings = Object.entries(values)
      .map(([key, val]) => {
        if (val === true) return ` ${key}`; // boolean prop
        if (val === false || val === undefined || val === '') return '';
        return ` ${key}="${val}"`;
      })
      .join('');

    return `<${componentName}${propStrings}>Button</${componentName}>`;
  };

  // Update DOM manually for Web Components if React doesn't handle custom events/complex props well
  // But for simple attributes, React 19 (or standard) works fine.
  // We will simply render the custom element.

  const ComponentTag = componentName as any;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">{componentName}</h2>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8 bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        {/* Main Preview Area */}
        <div className="space-y-0">
          <div className="p-12 min-h-[300px] flex items-center justify-center bg-muted/30 border-b border-border">
            <ComponentTag {...values}>
              Button
            </ComponentTag>
          </div>

          {/* Code Block */}
          <div className="relative group bg-slate-950 p-4">
            <button
              onClick={() => {
                navigator.clipboard.writeText(generateCode());
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="absolute right-4 top-4 p-2 rounded-md bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <pre className="text-sm font-mono text-blue-300 overflow-x-auto">
              <code>{generateCode()}</code>
            </pre>
          </div>
        </div>

        {/* Controls Sidebar */}
        <div className="p-6 border-l border-border bg-card h-full">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Properties</h3>
          <div className="space-y-6">
            {props.map(prop => (
              <div key={prop.name} className="space-y-2">
                <label className="text-sm font-medium flex items-center justify-between">
                  <span>{prop.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">{prop.type}</span>
                </label>

                {renderControl(prop, values[prop.name], (val) => handlePropChange(prop.name, val))}

                {prop.description && (
                  <p className="text-xs text-muted-foreground">{prop.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderControl(prop: PropDefinition, value: any, onChange: (val: any) => void) {
  if (prop.type === 'boolean') {
    return (
      <div className="flex items-center h-9">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
        />
      </div>
    );
  }

  if (prop.options && prop.options.length > 0) {
    return (
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm rounded-md border border-input bg-background px-3 py-2"
      >
        {prop.options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    );
  }

  return (
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-sm rounded-md border border-input bg-background px-3 py-2"
    />
  );
}
