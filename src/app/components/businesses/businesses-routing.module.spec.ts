import { BusinessesRoutingModule } from './businesses-routing.module';

describe('BusinessesRoutingModule', () => {
  let businessesRoutingModule: BusinessesRoutingModule;

  beforeEach(() => {
    businessesRoutingModule = new BusinessesRoutingModule();
  });

  it('should create an instance', () => {
    expect(businessesRoutingModule).toBeTruthy();
  });
});
