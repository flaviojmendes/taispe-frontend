import { UrlDirective } from './url.directive';

describe('UrlDirective', () => {
  it('should create an instance', () => {
    const el = {
      nativeElement: {
        value: 'salgados'
      }
    }
    const directive = new UrlDirective(el);
    expect(directive).toBeTruthy();
  });
});
