import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactFormComponent, ErrorMessageComponent],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  private readonly contactService = inject(ContactService);
  private readonly destroy$ = new Subject<void>();

  contacts = signal<Contact[]>([]);
  showForm = signal(false);
  editingContact = signal<Contact | null>(null);
  viewMode = signal<'grid' | 'list'>('grid');
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadContacts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  dismissError(): void {
    this.errorMessage.set(null);
  }

  loadContacts(): void {
    this.contactService.getContacts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (contacts) => this.contacts.set(contacts),
      error: () => this.errorMessage.set('Could not load contacts. The server may be unreachable.')
    });
  }

  openAddForm(): void {
    this.editingContact.set(null);
    this.showForm.set(true);
  }

  editContact(contact: Contact): void {
    this.editingContact.set(contact);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingContact.set(null);
  }

  onSave(contact: Contact): void {
    if (contact.id) {
      this.contactService.updateContact(contact.id, contact)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.closeForm();
          this.loadContacts();
        },
        error: () => this.errorMessage.set('Could not update contact. The server may be unreachable.')
      });
    } else {
      this.contactService.createContact(contact)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.closeForm();
          this.loadContacts();
        },
        error: () => this.errorMessage.set('Could not create contact. The server may be unreachable.')
      });
    }
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.loadContacts(),
        error: () => this.errorMessage.set('Could not delete contact. The server may be unreachable.')
      });
    }
  }

}
