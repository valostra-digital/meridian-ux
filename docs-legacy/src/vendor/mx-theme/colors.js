import { generate } from '@ant-design/colors';
/**
 * Generate a 10-shade palette from a hex color
 */
export function generatePalette(color) {
    return generate(color, { theme: 'default' });
}
/**
 * Generate CSS variable name for a color shade
 */
export function getColorVar(colorName, shade) {
    return `--mx-color-${colorName}-${shade}`;
}
/**
 * Generate all CSS variables for a color palette
 */
export function generateColorVars(colorName, hexColor) {
    const palette = generatePalette(hexColor);
    const vars = {};
    // Generate shade variables (1-10)
    palette.forEach((color, index) => {
        vars[getColorVar(colorName, index + 1)] = color;
    });
    // Generate semantic alias variables
    vars[`--mx-color-${colorName}`] = palette[5]; // Base color (6th shade)
    vars[`--mx-color-${colorName}-hover`] = palette[4]; // Lighter for hover
    vars[`--mx-color-${colorName}-active`] = palette[6]; // Darker for active
    vars[`--mx-color-${colorName}-bg`] = palette[0]; // Lightest for backgrounds
    vars[`--mx-color-${colorName}-bg-hover`] = palette[1];
    vars[`--mx-color-${colorName}-border`] = palette[2];
    vars[`--mx-color-${colorName}-border-hover`] = palette[3];
    return vars;
}
/**
 * Generate neutral/text/background color CSS variables
 */
export function generateNeutralVars() {
    return {
        // Text colors
        '--mx-color-text': 'rgba(0, 0, 0, 0.88)',
        '--mx-color-text-secondary': 'rgba(0, 0, 0, 0.65)',
        '--mx-color-text-tertiary': 'rgba(0, 0, 0, 0.45)',
        '--mx-color-text-quaternary': 'rgba(0, 0, 0, 0.25)',
        '--mx-color-text-disabled': 'rgba(0, 0, 0, 0.25)',
        // Border colors
        '--mx-color-border': '#d9d9d9',
        '--mx-color-border-secondary': '#f0f0f0',
        // Fill colors
        '--mx-color-fill': 'rgba(0, 0, 0, 0.15)',
        '--mx-color-fill-secondary': 'rgba(0, 0, 0, 0.06)',
        '--mx-color-fill-tertiary': 'rgba(0, 0, 0, 0.04)',
        '--mx-color-fill-quaternary': 'rgba(0, 0, 0, 0.02)',
        // Background colors
        '--mx-color-bg-base': '#ffffff',
        '--mx-color-bg-layout': '#f5f5f5',
        '--mx-color-bg-container': '#ffffff',
        '--mx-color-bg-elevated': '#ffffff',
        '--mx-color-bg-spotlight': 'rgba(0, 0, 0, 0.85)',
        '--mx-color-bg-mask': 'rgba(0, 0, 0, 0.45)',
    };
}
//# sourceMappingURL=colors.js.map