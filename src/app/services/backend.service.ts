import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

/**
 * This service acts as a mock back-end.
 * It has some intentional errors that you might have to fix.
 */

export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: string;
  assignedUser: User;
  completed: boolean;
};

function randomDelay() {
  return Math.random() * 4000;
}

@Injectable()
export class BackendService {
  storedTickets: Ticket[] = [
    {
      id: 0,
      description: 'Install a monitor arm',
      assignedUser: {
        id: 1111,
        name: 'Victor'
      },
      completed: false
    },
    {
      id: 1,
      description: 'Move the desk to the new location',
      assignedUser: {
        id: 1112,
        name: 'Brooks'
      },
      completed: false
    }
  ];

  storedUsers: User[] = [{ id: 111, name: 'Victor' }, { id: 112, name: 'Brooks' }];

  lastId = 1;

  constructor() { }

  private findTicketById = id =>
    this.storedTickets.find(ticket => ticket.id === +id);
  private findUserByName = name => this.storedUsers.find(user => user.name === name);

  tickets() {
    return of(this.storedTickets).pipe(delay(randomDelay()));
  }

  ticket(id: number): Observable<Ticket> {
    return of(this.findTicketById(id)).pipe(delay(randomDelay()));
  }

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserByName(id)).pipe(delay(randomDelay()));
  }

  newTicket(payload: { description: string }) {
    const newTicket: Ticket = {
      id: ++this.lastId,
      description: payload.description,
      assignedUser: null,
      completed: false
    };
    return of(newTicket).pipe(
      delay(randomDelay()),
      tap((ticket: Ticket) => this.storedTickets = [...this.storedTickets, ...[newTicket]])
    );
  }

  assign(ticketId: number, userName: string) {
    const foundTicket = this.findTicketById(+ticketId);
    const user = this.findUserByName(userName);
    if (foundTicket && user) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        map((ticket: Ticket) => {
          return ticket = { ...ticket, assignedUser: user };
        })
      );
    }

    return throwError(new Error('ticket or user not found'));
  }

  complete(ticketId: number, completed: boolean) {
    const foundTicket = this.findTicketById(+ticketId);
    if (foundTicket) {
      return of(foundTicket).pipe(
        delay(randomDelay()),
        tap((ticket: Ticket) => {
          ticket.completed = true;
        })
      );
    }

    return throwError(new Error('ticket not found'));
  }
}
