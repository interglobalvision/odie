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

export const stripScripts = (dangerousInput) => {
  let div = document.createElement('div');
  div.innerHTML = dangerousInput;
  let scripts = div.getElementsByTagName('script');
  let i = scripts.length;
  while (i--) {
    scripts[i].parentNode.removeChild(scripts[i]);
  }
  return div.innerHTML; 
}
