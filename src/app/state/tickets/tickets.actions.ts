export class TicketsAction {
  static readonly type = '[Tickets] Add item';
  constructor(public payload: string) { }
}
