import { Ticket } from "../../services/backend.service";

export class GetTickets {
  static readonly type = '[Tickets] Get Tickets';
  constructor() { }
}

export class CreateNewTicket {
  static readonly type = '[Tickets] Create New Ticket';
  constructor() { }
}

export class EditTicketAssignee {
  static readonly type = '[Tickets] Edit Ticket Assignee';
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

export class SearchTickets {
  static readonly type = '[Tickets] Search tickets';
}