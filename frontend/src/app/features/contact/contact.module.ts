// ============================================
// VP SOLUTIONS - Module: Contact
// ============================================

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }