import {escapeHtml, unescapeHtml, stripScripts} from './validation';

describe('escapeHtml()', () => {
  /**
   * Recieves an unescaped string and returns escaped HTML
   **/
  it('returns escaped HTML', () => {
    const initialValue = '"some HTML" & <>%*$(#&';
    const expectedValue = '\"some HTML\" &amp; &lt;&gt;%*$(#&amp;';

    expect(escapeHtml(initialValue)).toEqual(expectedValue);
  });
});

describe('unescapeHtml()', () => {
  /**
   * Recieves an unescaped string and returns escaped HTML
   **/
  it('returns escaped HTML', () => {
    const initialValue = '\"some HTML\" &amp; &lt;&gt;%*$(#&amp;';
    const expectedValue = '"some HTML" & <>%*$(#&';

    expect(unescapeHtml(initialValue)).toEqual(expectedValue);
  });
});

describe('stripScripts()', () => {
  /**
   * Recieves string with <script> and returns without
   **/
  it('returns string without script', () => {
    const initialValue = 'this is a string <script type="javascript"> alert("Evil Javascript Haxxx"); </script>without scripts';
    const expectedValue = 'this is a string without scripts';

    expect(stripScripts(initialValue)).toEqual(expectedValue);
  });
});
