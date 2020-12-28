import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { BackendService, Ticket } from 'src/app/services/backend.service';
import { CreateNewTicket, EditTicketAssigneeId, GetTickets, SetSelectedTicket } from './tickets.actions';
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
  }
}

const defaults = {
  tickets: [],
  selectedTicket: {
    id: 0,
    description: '',
    assigneeId: 0,
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
  defaults
})
@Injectable()
export class TicketsState {
  @Selector()
  static tickets(state: TicketsStateModel): Ticket[] | null {
    return state.tickets;
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

  @Action(EditTicketAssigneeId)
  editTicketAssigneeId(ctx: StateContext<TicketsStateModel>) {
    const state = ctx.getState();
    return this.backEndService.assign(state.selectedTicket.id, state.editTicketForm.model.assigneeId)
    .pipe(tap((result => {
      console.log('result = ');
      console.log(result);
      // const draft = produce(ctx.getState(), draft => {
      //   draft.tickets.push(result);
      // });
      // ctx.setState(draft);
    })))
  }

}
