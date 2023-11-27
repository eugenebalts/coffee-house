const repaintSvg = (svg: string, color: 'dark' | 'light') => {
  const DARK = '#403F3D';
  const LIGHT = '#E1D4C9';

  const strokeRegex = /stroke="([^"]*)"/g;

  if (svg.match(strokeRegex)) {
    return svg.replace(strokeRegex, `stroke="${color}"`);
  }
};

export default repaintSvg;
