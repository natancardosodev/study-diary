import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-add-study',
  templateUrl: './add-study.component.html',
  styleUrls: ['./add-study.component.scss']
})
export class AddStudyComponent implements OnInit {

  public studyForm: FormGroup;
 
  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) { }

 
  ngOnInit() {
    this.crudApi.GetStudysList();
    this.studenForm();
  }

  // Reactive student form
  studenForm() {
    this.studyForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })  
  }

  // Accessing form control using getters
  get firstName() {
    return this.studyForm.get('firstName');
  }

  get lastName() {
    return this.studyForm.get('lastName');
  }  

  get email() {
    return this.studyForm.get('email');
  }

  get mobileNumber() {
    return this.studyForm.get('mobileNumber');
  }

  // Reset student form's values
  ResetForm() {
    this.studyForm.reset();
  }  
 
  submitStudyData() {
    this.crudApi.AddStudy(this.studyForm.value);
    this.toastr.success(this.studyForm.controls['firstName'].value + ' successfully added!');
    this.ResetForm();
  };

}
