import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { TicketsAction } from './tickets.actions';

export class TicketsStateModel {
  public items: string[];
}

const defaults = {
  items: []
};

@State<TicketsStateModel>({
  name: 'tickets',
  defaults
})
@Injectable()
export class TicketsState {
  @Action(TicketsAction)
  add({ getState, setState }: StateContext<TicketsStateModel>, { payload }: TicketsAction) {
    const state = getState();
    setState({ items: [ ...state.items, payload ] });
  }
}
