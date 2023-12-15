import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseURL: string = "http://localhost:3000/api/payment"
  tokenKey: string = "myVideoToken";

  constructor(private http: HttpClient) { }

  newPayment(newPayment: Payment) {
    return this.http.post(`${this.baseURL}/`, newPayment);
  }

  updatePayment(updatedPayment: Payment): Observable<Payment> {
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    return this.http.put<Payment>(`${this.baseURL}/:paymentId`, updatedPayment);
  }
}
