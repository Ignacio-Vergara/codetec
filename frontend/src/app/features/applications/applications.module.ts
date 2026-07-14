// ============================================
// VP SOLUTIONS - Module: Applications
// ============================================

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';

// Shared Components
import { CardComponent } from '../../shared/components/card/card.component';

@NgModule({
  declarations: [
    ApplicationsComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ApplicationsRoutingModule
  ]
})
export class ApplicationsModule { }