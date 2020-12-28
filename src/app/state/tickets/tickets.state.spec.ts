import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { TicketsState, TicketsStateModel } from './tickets.state';
import { CreateNewTicket, GetTickets } from './tickets.actions';
import { BackendService } from '../../services/backend.service';


describe('Tickets actions', () => {
  let store: Store;
  let spy: any;
  let backendService: BackendService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TicketsState])],
      providers: [BackendService]
    }).compileComponents();
    backendService = TestBed.inject(BackendService);
    store = TestBed.inject(Store);
  }));

  it('should call get tickets', () => {
    spy = spyOn(backendService, 'tickets')
    store.dispatch(new GetTickets());
    expect(backendService.tickets).toHaveBeenCalled();
  });

  it('should create new a new ticket', () => {
    spy = spyOn(backendService, 'newTicket');
    const newTicketState: TicketsStateModel = {
      tickets: [],
      selectedTicket: null,
      newTicketForm: {
        model: {ticketDescription: 'testTicket'},
        dirty: false,
        status: '',
        errors: {}
      },
      editTicketForm: {
        model: {ticketDescription: 'testTicket'},
        dirty: false,
        status: '',
        errors: {}
      }

    }
    store.reset({
      ...store.snapshot(),
      tickets: newTicketState
    });
    store.dispatch(new CreateNewTicket());
    expect(backendService.newTicket).toHaveBeenCalled();
    expect(backendService.newTicket).toHaveBeenCalledWith({description: 'testTicket'});
  });

});
