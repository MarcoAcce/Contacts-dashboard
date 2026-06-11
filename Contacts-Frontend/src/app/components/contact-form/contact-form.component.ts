import { Component, EventEmitter, Input, Output, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input() contact: Contact | null = null;
  @Output() save = new EventEmitter<Contact>();
  @Output() cancel = new EventEmitter<void>();

  validationError = signal('');

  form: Contact = {
    name: null,
    address: null,
    phoneNumber: null,
    birthday: null,
    email: null
  };

  ngOnInit(): void {
    if (this.contact) {
      this.form = { ...this.contact };
    }
  }

  onSubmit(): void {
    const hasAtLeastOne =
      (this.form.name && this.form.name.trim()) ||
      (this.form.email && this.form.email.trim()) ||
      (this.form.phoneNumber && this.form.phoneNumber.trim()) ||
      (this.form.address && this.form.address.trim()) ||
      this.form.birthday;

    if (!hasAtLeastOne) {
      this.validationError.set('At least one field must be filled.');
      return;
    }

    this.validationError.set('');
    this.save.emit({ ...this.form });
  }
}
