import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-step-one-personal-info',
  templateUrl: './step-one-personal-info.component.html',
  styleUrls: ['./step-one-personal-info.component.css'],
})

export class StepOnePersonalInfoComponent implements OnInit {
  stepForm!: FormGroup;

  @Input() formGroupName!: string; 

  constructor(private inputFormGroup: FormGroupDirective) { }


  ngOnInit(): void {
    this.stepForm = this.inputFormGroup.control.get(this.formGroupName) as FormGroup;
  }


}