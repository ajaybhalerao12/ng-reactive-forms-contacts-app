import { Component } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { ContactsService } from '../contacts/contacts.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contacts: Contact[] = [];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getAllContacts().subscribe(contacts => this.contacts = contacts);
  }

  get favoriteContacts(): Contact[] {
    return this.contacts
      .filter(c => c.favoritesRanking && c.favoritesRanking > 0)
      .sort(this.sortByFavoriteRanking);
  }

  sortByFavoriteRanking(a: Contact, b: Contact): number {
    if (!a.favoritesRanking)
      return -1;
    if (!b.favoritesRanking)
      return 1;
    if (a.favoritesRanking < b.favoritesRanking)
      return -1;
    else if (a.favoritesRanking > b.favoritesRanking)
      return 1;

    return 0;
  }
}
