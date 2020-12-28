import { Ticket } from "src/app/services/backend.service";

export class GetTickets {
  static readonly type = '[Tickets] Get Tickets';
  constructor() { }
}

export class CreateNewTicket {
  static readonly type = '[Tickets] Create New Ticket';
  constructor() { }
}

export class EditTicketAssigneeId {
  static readonly type = '[Tickets] Edit Ticket';
  constructor() {}
}

export class EditTicketCompleteStatus {
  static readonly type = '[Tickets] Edit Ticket Complete Status';
  constructor() {}
}
export class SetSelectedTicket {
  static readonly type = '[Tickets] Set Selected Ticket';
  constructor(public payload: Ticket) {}
}