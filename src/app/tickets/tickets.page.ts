import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Ticket } from '../services/backend.service';
import { CreateNewTicket, SetSelectedTicket } from '../state/tickets/tickets.actions';
import { TicketsState } from '../state/tickets/tickets.state';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  @Select(TicketsState.tickets) tickets$: Observable<Ticket[]>;
  public tickets: Ticket[];
  public newTicketForm = new FormGroup({
    ticketDescription: new FormControl([], Validators.required)
  });

  constructor(private store: Store) { }

  ngOnInit() {
    this.tickets$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(data => {
      this.tickets = data;
    });
  }

  public onSubmit() {
    this.store.dispatch(new CreateNewTicket())
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.newTicketForm.reset();
    })
  }

  public editTicket(ticket: Ticket) {
    this.store.dispatch(new SetSelectedTicket(ticket));
    this.store.dispatch(new Navigate(['/ticket-details']));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
