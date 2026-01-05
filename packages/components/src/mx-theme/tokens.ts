/**
 * Complete Ant Design default tokens (non-color)
 * Based on Ant Design v5/v6 default theme
 */

export const DEFAULT_TOKENS = {
  // Typography
  fontSize: 14,
  fontSizeSM: 12,
  fontSizeLG: 16,
  fontSizeXL: 20,
  fontSizeHeading1: 38,
  fontSizeHeading2: 30,
  fontSizeHeading3: 24,
  fontSizeHeading4: 20,
  fontSizeHeading5: 16,

  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
  fontFamilyCode: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,

  lineHeight: 1.5715,
  lineHeightSM: 1.66,
  lineHeightLG: 1.5,
  lineHeightHeading1: 1.21,
  lineHeightHeading2: 1.35,
  lineHeightHeading3: 1.35,
  lineHeightHeading4: 1.4,
  lineHeightHeading5: 1.5,

  fontWeightStrong: 600,

  // Spacing
  sizeStep: 4,
  sizeUnit: 4,

  // Border Radius
  borderRadius: 6,
  borderRadiusXS: 2,
  borderRadiusSM: 4,
  borderRadiusLG: 8,
  borderRadiusOuter: 4,

  // Border Width
  lineWidth: 1,
  lineWidthBold: 2,
  lineWidthFocus: 4,

  // Control Heights
  controlHeight: 32,
  controlHeightSM: 24,
  controlHeightLG: 40,
  controlHeightXS: 16,

  // Padding
  padding: 16,
  paddingXS: 8,
  paddingSM: 12,
  paddingLG: 24,
  paddingXL: 32,
  paddingContentHorizontal: 16,
  paddingContentVertical: 12,

  // Margin
  margin: 16,
  marginXS: 8,
  marginSM: 12,
  marginLG: 24,
  marginXL: 32,
  marginXXL: 48,

  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  motionEaseIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  motionEaseOutBack: 'cubic-bezier(0.12, 0.4, 0.29, 1.46)',
  motionEaseInBack: 'cubic-bezier(0.71, -0.46, 0.88, 0.6)',
  motionEaseOutCirc: 'cubic-bezier(0.08, 0.82, 0.17, 1)',
  motionEaseInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.34)',
  motionEaseInOutCirc: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',

  // Duration
  motionDurationFast: '0.1s',
  motionDurationMid: '0.2s',
  motionDurationSlow: '0.3s',

  // Z-Index
  zIndexBase: 0,
  zIndexPopupBase: 1000,

  // Opacity
  opacityLoading: 0.65,
  opacityImage: 1,

  // Shadow
  boxShadow: `
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05)
  `,
  boxShadowSecondary: `
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05)
  `,
  boxShadowTertiary: `
    0 1px 2px 0 rgba(0, 0, 0, 0.03),
    0 1px 6px -1px rgba(0, 0, 0, 0.02),
    0 2px 4px 0 rgba(0, 0, 0, 0.02)
  `,

  // Wireframe (for debugging/showing structure)
  wireframe: false,

  // Screen breakpoints (for reference)
  screenXS: 480,
  screenXSMin: 480,
  screenSM: 576,
  screenSMMin: 576,
  screenMD: 768,
  screenMDMin: 768,
  screenLG: 992,
  screenLGMin: 992,
  screenXL: 1200,
  screenXLMin: 1200,
  screenXXL: 1600,
  screenXXLMin: 1600,
} as const;

export type TokenKeys = keyof typeof DEFAULT_TOKENS;