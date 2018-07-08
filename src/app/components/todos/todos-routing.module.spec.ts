import { TodosRoutingModule } from './todos-routing.module';

describe('TodosRoutingModule', () => {
  let todosRoutingModule: TodosRoutingModule;

  beforeEach(() => {
    todosRoutingModule = new TodosRoutingModule();
  });

  it('should create an instance', () => {
    expect(todosRoutingModule).toBeTruthy();
  });
});
