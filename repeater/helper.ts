export function getTextOrNumber(el: Element) {
  const value = getText(el);
  const num = getNumber(value);
  return !isNaN(num) ? num : value;
}

export function getNumber(text: string, reg: RegExp = /([-+]?\d*\.?\d*)/g) {
  let result = NaN;
  if (text && text.match) {
    const match = reg.exec(text);
    // console.log('match', match);
    if (match) {
      result = parseFloat(match[1]);
    }
  }
  return result;
}

export function getText(el: Element) {
  if (el) {
    let text: string = el.innerHTML;
    if (text) {
      text = text.replace(/<script>.*<\/script>/g, " ");
      text = text.replace(/<[^>]*>/g, " ");
      return text.trim();
    }
  }
  return "";
}

export interface IObject<T> {
  [index: string]: T;
}
