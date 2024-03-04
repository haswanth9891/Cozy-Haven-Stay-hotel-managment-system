import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { JwtClientService } from 'src/app/services/jwt-client.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  paymentMethod: string = '';
  processedPayment: any = {};


  upiId: string = '';
  bankName: string = '';
  accountNumber: string = '';
  creditCardNumber: string = '';
  debitCardNumber: string = '';

  constructor(private paymentService: PaymentService, private jwtService: JwtClientService, private router: Router) {


  }


  reservationId = this.paymentService.getReservationId();
  fare = this.paymentService.getTotalFare();


  makePayment() {

    const loggedInUser = this.jwtService.getUserId();
    console.log(loggedInUser);

    if (loggedInUser !== null) {




      this.paymentService
        .processPayment(this.reservationId, loggedInUser, this.paymentMethod)
        .subscribe(
          (payment: any) => {
            this.processedPayment = payment;

          },
          (error) => {
            console.error('Error making payment:', error);
          }
        );

    } else {
      console.error('No logged-in user found.');
    }



  }


}



