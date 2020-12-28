import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NgxsModule, Store } from '@ngxs/store';
import { BackendService } from '../services/backend.service';
import { TicketsState } from '../state/tickets/tickets.state';

import { TicketDetailsPage } from './ticket-details.page';

describe('TicketDetailsPage', () => {
  let store: Store;
  let component: TicketDetailsPage;
  let fixture: ComponentFixture<TicketDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDetailsPage ],
      providers: [Store, BackendService],
      imports: [IonicModule.forRoot(), NgxsModule.forRoot([TicketsState])]
    }).compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(TicketDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
