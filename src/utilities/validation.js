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

export const validateSubdomain = (subdomain) => {
  const specialChars = /[ !@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/;

  // true if no special characters present in string
  const isValid = !specialChars.test(subdomain);

  return isValid;
}

export const validateDocUrl = (docUrl) => {
  // create <a> element and set href attr to docUrl
  const parser = document.createElement('a');
  parser.href = docUrl;

  // split path into array of parts
  const pathParts = parser.pathname.split("/");

  const isValid =
    parser.protocol === 'https:' &&
    parser.hostname === 'docs.google.com' &&
    pathParts[1] === 'document' &&
    pathParts[5] === 'pub';

  return isValid;
}

export const validateEmail = (emailString) => {
  const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // true if email string fits regex format
  const isValid = emailFormat.test(emailString);

  return isValid;
}

export const validatePassword = (password) => {
  const isValid =
    /[A-Z]/.test(password) && // Uppercase letter
    /[a-z]/.test(password) && // Lowercase letter
    /[0-9]/.test(password) && // Number
    /^\S+$/.test(password) && // No whitespace
    password.length >= 8 // Min length 8 chars

  return isValid;
}
