import { BusinessesModule } from './businesses.module';

describe('BusinessesModule', () => {
  let businessesModule: BusinessesModule;

  beforeEach(() => {
    businessesModule = new BusinessesModule();
  });

  it('should create an instance', () => {
    expect(businessesModule).toBeTruthy();
  });
});
