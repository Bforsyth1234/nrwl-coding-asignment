import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { BackendService, Ticket } from '../../services/backend.service';
import { CreateNewTicket, EditTicketAssignee, GetTickets, SetSelectedTicket } from './tickets.actions';
import produce from 'immer';

export interface TicketsStateModel {
  tickets: Ticket[];
  selectedTicket: Ticket;
  newTicketForm: {
    model: any,
    dirty: boolean,
    status: string,
    errors: any
  }
  editTicketForm: {
    model: any,
    dirty: boolean,
    status: string,
    errors: any
  },
  searchForm: {
    model: any,
    dirty: boolean,
    status: string,
    errors: any
  }
}

const defaults = {
  tickets: [],
  selectedTicket: {
    id: 0,
    description: '',
    user: {
      userId: null,
      name: ''
    },
    completed: false
  },
  newTicketForm: {
    model: undefined,
    dirty: false,
    status: '',
    errors: {}
  },
  editTicketForm: {
    model: undefined,
    dirty: false,
    status: '',
    errors: {}
  }
};

@State<TicketsStateModel>({
  name: 'tickets',
})
@Injectable()
export class TicketsState {
  @Selector()
  static tickets(state: TicketsStateModel): Ticket[] | null {
    return state.tickets;
  }

  static filteredTickets(searchParam: string) {
    return createSelector([TicketsState.tickets], (state: Ticket[]) => {
      return state.filter(ticket => ticket.description.includes(searchParam));
    })
  }

  @Selector()
  static selectedTicket(state: TicketsStateModel): Ticket | null {
    return state.selectedTicket;
  }


  constructor(private backEndService: BackendService) { }

  @Action(GetTickets)
  getTIckets(ctx: StateContext<TicketsStateModel>) {
    return this.backEndService.tickets().pipe(tap((result => {
      ctx.patchState({
        tickets: result
      })
    })))
  }


  @Action(CreateNewTicket)
  createNewTicket(ctx: StateContext<TicketsStateModel>) {
    const state = ctx.getState();
    return this.backEndService.newTicket({ description: state.newTicketForm.model.ticketDescription })
      .pipe(tap((result => {
        const draft = produce(ctx.getState(), draft => {
          draft.tickets.push(result);
        });
        ctx.setState(draft);
      })))
  }

  @Action(SetSelectedTicket)
  setSelectedTicket(ctx: StateContext<TicketsStateModel>, action: SetSelectedTicket) {
    const draft = produce(ctx.getState(), draft => {
      draft.selectedTicket = action.payload;
    });
    ctx.setState(draft);
  }

  @Action(EditTicketAssignee)
  editTicketAssignee(ctx: StateContext<TicketsStateModel>) {
    const state = ctx.getState();
    return this.backEndService.assign(state.selectedTicket.id, state.editTicketForm.model.name)
    .pipe(tap((result => {
      const draft = produce(ctx.getState(), draft => {
        draft.tickets = draft.tickets.map(ticket => {
          if(ticket.id === result.id) {
            ticket = result;
          }
          return ticket;
        });
      });
      ctx.setState(draft);
    })))
  }

}
