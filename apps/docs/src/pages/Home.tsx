import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="space-y-16 py-10">
      {/* Hero */}
      <section className="text-center space-y-6">
        <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Meridian UX
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          An enterprise-grade Web Component library built for the future.
          Framework-agnostic, accessible, and stunningly designed.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/components/mx-button"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/valostra-digital/meridian-ux"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={Zap}
          title="Lightning Fast"
          description="Built with Lit, ensuring minimal overhead and maximum performance."
        />
        <FeatureCard
          icon={Shield}
          title="Type Safe"
          description="Written in TypeScript with complete type definitions included."
        />
        <FeatureCard
          icon={Sparkles}
          title="Premium Design"
          description="Based on Ant Design principles with a modern, refined aesthetic."
        />
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: any) {
  return (
    <div className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card/80 transition-all hover:shadow-lg">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
