export function getImgSrc(img) {
  if (!img) return '';
  return typeof img === 'string' ? img : img.src;
}
