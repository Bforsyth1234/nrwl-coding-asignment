import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NgxsModule, Store } from '@ngxs/store';
import { BackendService } from '../services/backend.service';
import { TicketsState } from '../state/tickets/tickets.state';

import { TicketsPage } from './tickets.page';

describe('TicketsPage', () => {
  let component: TicketsPage;
  let fixture: ComponentFixture<TicketsPage>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsPage ],
      providers: [Store, BackendService],
      imports: [IonicModule.forRoot(), NgxsModule.forRoot([TicketsState])],
    }).compileComponents();
    store = TestBed.inject(Store);

    fixture = TestBed.createComponent(TicketsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
