import {
  escapeHtml,
  unescapeHtml,
  validateSubdomain,
  validateDocUrl,
  validateEmail,
  validatePassword,
} from './validation';

describe('escapeHtml()', () => {
  it('should escape input text', () => {
    const initialValue = '"some HTML" & <>%*$(#&';
    const expectedValue = '\"some HTML\" &amp; &lt;&gt;%*$(#&amp;';

    expect(escapeHtml(initialValue)).toEqual(expectedValue);
  });
});

describe('unescapeHtml()', () => {
  it('should unescape input text', () => {
    const initialValue = '\"some HTML\" &amp; &lt;&gt;%*$(#&amp;';
    const expectedValue = '"some HTML" & <>%*$(#&';

    expect(unescapeHtml(initialValue)).toEqual(expectedValue);
  });
});

describe('validateSubdomain()', () => {
  const invalidChars = `!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?`;

  // Run a test for every invalid character
  for(const key in invalidChars) {

    const invalidChar = invalidChars[key];

    it(`should return false if ${invalidChar} is present in the input`, () => {

      const subdomain = `foo${invalidChar}bar`;

      expect(validateSubdomain(subdomain)).toEqual(false);
    });
  }

  it(`should return true if no invalid characters are present in the input`, () => {

    const subdomain = `foobar`;

    expect(validateSubdomain(subdomain)).toEqual(true);
  });
});

describe('validateDocUrl()', () => {
  it('should return false if the protocol is not https', () => {
    const docUrl = 'http://docs.google.com/document/d/e/2PACX-1vS_jyS7mJPnulZJIkJcPs3gIyvnxAdBU1uvgOabSn4RBtOwsg1FbCNYbdcYKQaH-PxU-0CmEHmH-NS4/pub'

    expect(validateDocUrl(docUrl)).toEqual(false);
  });

  it('should return false if the host name is not doc.google.com', () => {
    const docUrl = 'https://docs.NOT-google.com/document/d/e/2PACX-1vS_jyS7mJPnulZJIkJcPs3gIyvnxAdBU1uvgOabSn4RBtOwsg1FbCNYbdcYKQaH-PxU-0CmEHmH-NS4/pub'

    expect(validateDocUrl(docUrl)).toEqual(false);
  });

  it('should return false if the first path is not /document', () => {
    const docUrl = 'https://docs.google.com/NOT-document/d/e/2PACX-1vS_jyS7mJPnulZJIkJcPs3gIyvnxAdBU1uvgOabSn4RBtOwsg1FbCNYbdcYKQaH-PxU-0CmEHmH-NS4/pub'

    expect(validateDocUrl(docUrl)).toEqual(false);
  });

  it('should return false if the last path is not /pub', () => {
    const docUrl = 'https://docs.google.com/document/d/e/2PACX-1vS_jyS7mJPnulZJIkJcPs3gIyvnxAdBU1uvgOabSn4RBtOwsg1FbCNYbdcYKQaH-PxU-0CmEHmH-NS4/NOT-pub'

    expect(validateDocUrl(docUrl)).toEqual(false);
  });

  it('should return true if the url is a valid google doc url (public)', () => {
    const docUrl = 'https://docs.google.com/document/d/e/2PACX-1vS_jyS7mJPnulZJIkJcPs3gIyvnxAdBU1uvgOabSn4RBtOwsg1FbCNYbdcYKQaH-PxU-0CmEHmH-NS4/pub'

    expect(validateDocUrl(docUrl)).toEqual(true);
  });
});

describe('validateEmail()', () => {
  it('should return false if the password doesn\'t have an uppercase letter', () => {
    const password = 'mypassword123';

    expect(validatePassword(password)).toEqual(false);
  });

  it('should return false if the password doesn\'t have a lowercase letter', () => {
    const password = 'MYPASSWORD123';

    expect(validatePassword(password)).toEqual(false);
  });

  it('should return false if the password doesn\'t have a number', () => {
    const password = 'MyPassword';

    expect(validatePassword(password)).toEqual(false);
  });

  it('should return false if the password have a whitespace', () => {
    const password = 'My Password123';

    expect(validatePassword(password)).toEqual(false);
  });

  it('should return false if the password length is less than 8 characters', () => {
    const password = 'MyPass1';

    expect(validatePassword(password)).toEqual(false);
  });

  it('should return true if the password is valid', () => {
    const password = 'MyPassword123';

    expect(validatePassword(password)).toEqual(true);
  });
});
