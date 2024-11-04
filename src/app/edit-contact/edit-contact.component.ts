import { ContactsService } from './../contacts/contacts.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit {

  firstName = new FormControl();
  lastName = new FormControl();
  dateOfBirth = new FormControl();
  favoritesRanking = new FormControl();

  constructor(private route: ActivatedRoute,
    private contactService: ContactsService
  ) { }

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactService.getContact(contactId).subscribe((contact) => {
      if (contact) {
        this.firstName.setValue(contact.firstName);
        this.lastName.setValue(contact.lastName);
        this.dateOfBirth.setValue(contact.dateOfBirth);
        this.favoritesRanking.setValue(contact.favoritesRanking);
      }
    });
  }

  saveContact() {
    console.log(this.firstName.value);
    console.log(this.lastName.value);
    console.log(this.dateOfBirth.value);
  }
}
