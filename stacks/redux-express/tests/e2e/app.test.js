/* global fixture test */
import { Selector } from 'testcafe';

fixture`End to end testing`.page`http://localhost:3000`;

test('Home page', async t => {
  await t.expect(Selector('h1').innerText).eql('Welcome to React');
});
