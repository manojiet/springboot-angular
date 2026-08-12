import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="user-form" novalidate>
      <div class="form-row">
        <label for="firstName">First name *</label>
        <input id="firstName" type="text" autocomplete="given-name" formControlName="firstName" />
        <div class="error" *ngIf="isInvalid('firstName')">First name is required.</div>
      </div>

      <div class="form-row">
        <label for="lastName">Last name</label>
        <input id="lastName" type="text" autocomplete="family-name" formControlName="lastName" />
      </div>

      <div class="form-row">
        <label for="email">Email *</label>
        <input id="email" type="email" autocomplete="email" formControlName="email" />
        <div class="error" *ngIf="isInvalid('email')">
          Enter a valid email address.
        </div>
      </div>

      <div class="form-row">
        <label for="phone">Phone *</label>
        <input id="phone" type="tel" autocomplete="tel" formControlName="phone" />
        <div class="error" *ngIf="isInvalid('phone')">Phone is required.</div>
      </div>

      <div class="form-actions">
        <button type="submit" [disabled]="form.invalid">Save</button>
        <button type="button" (click)="cancel.emit()">Cancel</button>
      </div>
    </form>
  `
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() user?: User | null;
  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const userChange = changes['user'];
    if (userChange && this.form) {
      this.form.patchValue({
        firstName: this.user?.firstName ?? '',
        lastName: this.user?.lastName ?? '',
        email: this.user?.email ?? '',
        phone: this.user?.phone ?? ''
      });
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      firstName: [this.user?.firstName ?? '', Validators.required],
      lastName: [this.user?.lastName ?? ''],
      email: [this.user?.email ?? '', [Validators.required, Validators.email]],
      phone: [this.user?.phone ?? '', Validators.required]
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && control.touched;
  }

  onSubmit(): void {
    console.log('UserForm onSubmit called', { valid: this.form.valid, value: this.form.value });
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.warn('UserForm onSubmit aborted - form invalid');
      return;
    }

    const value = this.form.value as User;
    if (this.user?.id != null) {
      value.id = this.user.id;
    }
    this.save.emit(value);
  }
}
