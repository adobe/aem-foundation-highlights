/* eslint-disable no-unused-expressions */
/* global describe before it */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

let blockUtils;

document.body.innerHTML = await readFile({ path: './dummy.html' });
document.head.innerHTML = await readFile({ path: './head.html' });

describe('Utils methods', () => {
  before(async () => {
    blockUtils = await import('../../scripts/lib-franklin.js');
    document.body.innerHTML = await readFile({ path: './body.html' });
  });

  it('Sanitizes class name', async () => {
    expect(blockUtils.toClassName('Hello world')).to.equal('hello-world');
    expect(blockUtils.toClassName(null)).to.equal('');
  });

  it('Normalizes headings', async () => {
    const numHeadings = document.querySelectorAll('h1, h2, h3, h4, h5, h6').length;
    blockUtils.normalizeHeadings(document.querySelector('main'), ['h1', 'h2', 'h3']);
    expect(document.querySelectorAll('h1, h2, h3, h4, h5, h6').length).to.equal(numHeadings);
    expect(document.querySelectorAll('h4, h5, h6').length).to.equal(0);
  });
});

describe('Sections and blocks', () => {
  it('Loads blocks', async () => {
    await blockUtils.loadBlocks(document.querySelector('main'));
    document.querySelectorAll('main .block').forEach(($block) => {
      expect($block.dataset.blockStatus).to.equal('loaded');
    });
  });
});
