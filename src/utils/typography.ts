import Typography from 'typography';
import theme from 'typography-theme-st-annes';

const typography = new Typography(theme);

// Export helper functions
export const { scale, rhythm, options } = typography;
export default typography;
