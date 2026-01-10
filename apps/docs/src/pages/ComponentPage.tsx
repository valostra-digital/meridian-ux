import { useParams } from 'react-router-dom';
import componentsData from '../data/components.json';
import { ComponentPlayground } from '../components/ComponentPlayground';

export function ComponentPage() {
  const { id } = useParams();

  // Find component data
  // The JSON structure is an object keyed by tag name
  const components = componentsData as Record<string, any>;
  const component = id ? components[id] : undefined;

  if (!component) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold text-destructive">Component Not Found</h2>
        <p className="text-muted-foreground mt-2">Could not find documentation for "{id}"</p>
      </div>
    );
  }

  // Transform props for playground
  const props = component.properties || [];

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <ComponentPlayground
        componentName={component.tag}
        description={component.description}
        props={props}
      />

      {/* API Reference */}
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">API Reference</h2>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground font-medium border-b border-border">
              <tr>
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Default</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {props.map((prop: any) => (
                <tr key={prop.name} className="hover:bg-muted/50">
                  <td className="px-4 py-3 font-mono text-primary">{prop.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-purple-500">{prop.type}</td>
                  <td className="px-4 py-3 font-mono text-xs">{prop.default}</td>
                  <td className="px-4 py-3">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
