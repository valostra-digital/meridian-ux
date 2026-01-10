/**
 * Generate a 10-shade palette from a hex color
 */
export declare function generatePalette(color: string): string[];
/**
 * Generate CSS variable name for a color shade
 */
export declare function getColorVar(colorName: string, shade: number): string;
/**
 * Generate all CSS variables for a color palette
 */
export declare function generateColorVars(colorName: string, hexColor: string): Record<string, string>;
/**
 * Generate neutral/text/background color CSS variables
 */
export declare function generateNeutralVars(): Record<string, string>;
//# sourceMappingURL=colors.d.ts.map