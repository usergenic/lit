/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {orchestrator} from '../orchestrator.js';
import {assert} from '@esm-bundle/chai';

orchestrator.elementModules.set(
  'test-lazy-element',
  () => import('./test-lazy-element.js')
);

suite('Orchestrator', () => {
  let container: HTMLElement;

  setup(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  teardown(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  test('loads on event', async () => {
    container.innerHTML =
      '<test-lazy-element lazyactions="click"></test-lazy-element>';
    const el = container.firstChild as any;
    (el as HTMLElement).dispatchEvent(new Event('click'));
    await orchestrator.loadComplete();
    assert.isTrue(el.isBootstrapped);
    assert.isTrue(el.lazyController.isConnected);
    assert.equal(el.div1.textContent, 'initial');
    assert.equal(el.div2.textContent, 'initial');
    el.div2.dispatchEvent(new Event('click'));
    await el.updateComplete;
    assert.equal(el.div2.textContent, 'div2:click');
    assert.equal(el.div1.textContent, 'initial');
    //
    el.div1.dispatchEvent(new Event('click'));
    await el.updateComplete;
    assert.equal(el.div1.textContent, 'div1:click');
  });
});