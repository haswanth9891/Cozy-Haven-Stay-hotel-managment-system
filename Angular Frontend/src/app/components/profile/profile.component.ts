import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { JwtClientService } from 'src/app/services/jwt-client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService, private jwtService: JwtClientService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      gender: ['', [Validators.required, Validators.pattern(/^(male|female|non-binary)$/)]],
      address: ['', Validators.required]



    });

    if (this.signupForm) {
      this.signupForm.valueChanges.subscribe(() => {
        this.onFormValueChanged();
      });
    }
  }





  updateUser() {
    if (this.signupForm.invalid) {
      return;
    }

    const loggedInUser = this.jwtService.getUserId();
    console.log(loggedInUser);

    if (loggedInUser !== null) {

      const updatedUser: User = {

        userFirstName: this.signupForm.value.userFirstName,
        userLastName: this.signupForm.value.userLastName,
        username: this.signupForm.value.username,
        contactNumber: this.signupForm.value.contactNumber,
        password: this.signupForm.value.password,
        email: this.signupForm.value.email,
        gender: this.signupForm.value.gender,
        address: this.signupForm.value.address

      };

      this.userService.updateUser(updatedUser, loggedInUser)
        .subscribe(
          user => {
            console.log("Hi");
            console.log('Updated:', user);

            this.signupForm.reset();
            sessionStorage.setItem('userFirstName', user.userFirstName);
            alert('User Registered Successfully');
            this.router.navigate(['/login']);

          },
          error => {
            console.log('Error:', error);
            const errorMessage = error.message || 'An error occurred. Please try again later.';
            alert(errorMessage);
          }
        );
    } else {
      console.error('No logged-in user found.');
    }

  }



  isFieldValid(field: string) {
    const control = this.signupForm.get(field);
    return !control?.valid && control?.touched;
  }


  getErrorMessage(field: string) {
    if (this.signupForm.get(field)?.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }

  onFormValueChanged() {
    for (const field in this.signupForm.controls) {
      if (this.signupForm.controls.hasOwnProperty(field)) {
        this.signupForm.controls[field].markAsTouched();
      }
    }
  }


}
