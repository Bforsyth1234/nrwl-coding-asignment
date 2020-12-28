import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketDetailsPageRoutingModule } from './ticket-details-routing.module';

import { TicketDetailsPage } from './ticket-details.page';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
    IonicModule,
    TicketDetailsPageRoutingModule
  ],
  declarations: [TicketDetailsPage]
})
export class TicketDetailsPageModule {}
