export const escapeHtml = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

export const unescapeHtml = (escapedStr) => {
  let div = document.createElement('div');
  div.innerHTML = escapedStr;
  const child = div.childNodes[0];
  return child ? child.nodeValue : '';
}
