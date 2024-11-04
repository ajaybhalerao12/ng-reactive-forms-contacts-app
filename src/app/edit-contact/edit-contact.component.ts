import { Address } from './../contacts/contact.model';
import { CommonModule } from '@angular/common';
import { ContactsService } from './../contacts/contacts.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css',
})
export class EditContactComponent implements OnInit {
  contactForm = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    dateOfBirth: new FormControl(),
    favoritesRanking: new FormControl(),
    phone: new FormGroup({
      phoneNumber: new FormControl(),
      phoneType: new FormControl(),
    }),
    address: new FormGroup({
      streetAddress: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      postalCode: new FormControl(),
      addressType: new FormControl(),
    }),
  });
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService,
    private router: Router
  ) {}

  ngOnInit() {
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return;

    this.contactService.getContact(contactId).subscribe((contact) => {
      if (contact) {
        this.contactForm.controls.id.setValue(contact.id);
        this.contactForm.controls.firstName.setValue(contact.firstName);
        this.contactForm.controls.lastName.setValue(contact.lastName);
        this.contactForm.controls.dateOfBirth.setValue(contact.dateOfBirth);
        this.contactForm.controls.favoritesRanking.setValue(
          contact.favoritesRanking
        );
        this.contactForm.controls.phone.controls.phoneNumber.setValue(contact.phone.phoneNumber);
        this.contactForm.controls.phone.controls.phoneType.setValue(contact.phone.phoneType);

        this.contactForm.controls.address.controls.streetAddress.setValue(contact.address.streetAddress);
        this.contactForm.controls.address.controls.city.setValue(contact.address.city);
        this.contactForm.controls.address.controls.state.setValue(contact.address.state);
        this.contactForm.controls.address.controls.postalCode.setValue(contact.address.postalCode);
        this.contactForm.controls.address.controls.addressType.setValue(contact.address.addressType);
      }
    });
  }

  saveContact() {
    console.log('Saving contact...');
    console.log(this.contactForm.value);
    this.contactService.saveContact(this.contactForm.getRawValue()).subscribe(() => {
      this.router.navigate(['/contacts']);
    });
  }
}
