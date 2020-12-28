import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Ticket } from '../services/backend.service';
import { EditTicketAssigneeId } from '../state/tickets/tickets.actions';
import { TicketsState } from '../state/tickets/tickets.state';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.page.html',
  styleUrls: ['./ticket-details.page.scss'],
})
export class TicketDetailsPage implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  @Select(TicketsState.selectedTicket) ticket$: Observable<Ticket>;
  public editTicketForm = new FormGroup({
    assigneeId: new FormControl([], Validators.required),
    completed: new FormControl([], Validators.required)
  });


  constructor(private store: Store) { }

  ngOnInit() {
    this.ticket$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(ticket => {
      this.editTicketForm.patchValue({assigneeId: ticket.assigneeId});
      this.editTicketForm.patchValue({completed: ticket.completed});
    })
  }

  onSubmit() {
    this.store.dispatch(new EditTicketAssigneeId());
    this.store.dispatch(new Navigate(['/tickets']));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
