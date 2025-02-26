/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {LitElement, html} from 'lit';
const {getLocale} = {getLocale: () => 'en'};
console.log(`Locale is ${getLocale()}`);
window.addEventListener('lit-localize-status', (event) => {
  console.log(event.detail.status);
});
const user = 'Friend';
const url = 'https://www.example.com/';
// Plain string
('Hello World!');
// Plain string with expression
`Hello ${user}!`;
// Lit template
html`Hello <b>World</b>!`;
// Lit template with one XLIFF placeholder (combined start tag + expression +
// end tag).
html`Hello <b>${user}</b>!`;
// Lit template with two XLIFF placeholders (combined start tag + expression,
// separate end tag).
html`Click <a href=${url}>here</a>!`;
// Lit template with string expression
//
// TODO(aomarks) The "SALT" text is here because we have a check to make sure
// that two messages can't have the same ID unless they have identical template
// contents. After https://github.com/Polymer/lit-html/issues/1621 is
// implemented, add a "meaning" parameter instead.
html`[SALT] Click <a href="https://www.example.com/">here</a>!`;
// Lit template with nested msg expression
html`[SALT] Hello <b>World</b>!`;
// Lit template with comment
html`Hello <b><!-- comment -->World</b>!`;
// Custom ID
('Hello World');
// updateWhenLocaleChanges -> undefined
export class MyElement1 extends LitElement {
  constructor() {
    super();
    undefined;
  }
  render() {
    return html`<p>Hello <b>World</b>! (${getLocale()})</p>`;
  }
}
// @localized -> removed
export class MyElement2 extends LitElement {
  render() {
    return html`<p>Hello <b>World</b>! (${getLocale()})</p>`;
  }
}
