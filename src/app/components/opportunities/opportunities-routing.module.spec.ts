import { OpportunitiesRoutingModule } from './opportunities-routing.module';

describe('OpportunitiesRoutingModule', () => {
  let opportunitiesRoutingModule: OpportunitiesRoutingModule;

  beforeEach(() => {
    opportunitiesRoutingModule = new OpportunitiesRoutingModule();
  });

  it('should create an instance', () => {
    expect(opportunitiesRoutingModule).toBeTruthy();
  });
});
