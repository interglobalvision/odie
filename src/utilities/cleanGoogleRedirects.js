export const cleanGoogleRedirects = html => {
  const links = html.querySelectorAll('a');

  Array.prototype.forEach.call(links, element => {
    let href = element.href

    let pathParts = href.split("https://www.google.com/url?q=");
    href = pathParts[1];

    pathParts = href.split('&sa=D&ust')
    href = pathParts[0];

    element.href = href;
  });

  return html
}
