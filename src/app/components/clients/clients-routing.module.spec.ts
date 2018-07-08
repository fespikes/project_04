import { ClientsRoutingModule } from './clients-routing.module';

describe('ClientsRoutingModule', () => {
  let clientsRoutingModule: ClientsRoutingModule;

  beforeEach(() => {
    clientsRoutingModule = new ClientsRoutingModule();
  });

  it('should create an instance', () => {
    expect(clientsRoutingModule).toBeTruthy();
  });
});
