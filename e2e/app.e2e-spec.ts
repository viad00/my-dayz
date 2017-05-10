import { MyDayzPage } from './app.po';

describe('my-dayz App', () => {
  let page: MyDayzPage;

  beforeEach(() => {
    page = new MyDayzPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
