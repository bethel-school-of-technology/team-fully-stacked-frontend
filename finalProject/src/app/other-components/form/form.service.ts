// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private activeStepSubject = new BehaviorSubject<number>(1);
  activeStep$ = this.activeStepSubject.asObservable();

  multiStepForm: FormGroup = this.fb.group({
    personalDetails: this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }),
    planDetails: this.fb.group({
      plan: ['', [Validators.required]],
      billing: ['', [Validators.required]],
      planCost: [],
      totalCost: []
    }),
    paymentDetails: this.fb.group({
      nameOnCard: ['', [Validators.required, Validators.minLength(4)]],
      ccNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expDate: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      zipCode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]]
    }),
  })

  get stepForm(): FormGroup {
    return this.multiStepForm;
  }

  constructor(private fb: FormBuilder, private user: UserService, private router: Router) { }

  goToNextStep(number: number) {
    this.activeStepSubject.next(number + 1);
  }

  goBackToPreviousStep(number: number) {
    this.activeStepSubject.next(number - 1);
  }

  submit() {
    console.log(this.multiStepForm.value);
    const userInfo = this.multiStepForm.get('personalDetails')?.value;
    console.log("userInfo" + userInfo.name + userInfo.password + userInfo.email);
    const planInfo = this.multiStepForm.get('planDetails')?.value;
    console.log("planDetails" + planInfo.billing + " " + planInfo.plan + planInfo.totalCost);

    const userData = {
      name:userInfo.name,
      password:userInfo.password,
      email:userInfo.email,
      tier: planInfo.plan
    }

    this.user.signUp(userData).subscribe(() => {
      window.alert("User Registered Successfully");
      this.router.navigate(['login']);
  }, error => {
      window.alert("User Registration Error");
      console.log('Error: ', error)
  });

    const planData = {
      tier: planInfo.plan,
      paymentFrequency: planInfo.billing,
      price: planInfo.totalCost
    }

    // function to send payment to backend;

    //TO-DO => validate form
    this.goToNextStep(4);
    setTimeout(() => {
      this.activeStepSubject.next(1);
    }, 8000);
  }


}