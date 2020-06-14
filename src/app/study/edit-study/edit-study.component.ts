import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { CrudService } from '../shared/crud.service';
import { categories, levels, types } from '../shared/Const';

@Component({
  selector: 'app-edit-study',
  templateUrl: './edit-study.component.html',
  styleUrls: ['./edit-study.component.scss']
})
export class EditStudyComponent implements OnInit {
  
  public editForm: FormGroup;
  public categories = categories;
  public levels = levels;
  public types = types;
  public dateConfig = { 
    isAnimated: true,
    dateInputFormat: 'DD/MM/YYYY'
  };

  constructor(
    private crudApi: CrudService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.updateStudentData();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.crudApi.getStudy(id).valueChanges().subscribe(data => {
      data.date = new Date(data.date).toLocaleString('pt-BR', {timeZone: 'UTC'}).substr(0, 10);
      this.editForm.setValue(data);
    });
  }

  get subject(): AbstractControl {
    return this.editForm.get('subject');
  }

  get category(): AbstractControl {
    return this.editForm.get('category');
  }

  get date(): AbstractControl {
    return this.editForm.get('date');
  }

  get time(): AbstractControl {
    return this.editForm.get('time');
  }

  get level(): AbstractControl {
    return this.editForm.get('level');
  }

  get type(): AbstractControl {
    return this.editForm.get('type');
  }

  get note(): AbstractControl {
    return this.editForm.get('note');
  }

  updateStudentData(): void {
    this.editForm = this.fb.group({
      subject: ['', [Validators.required, Validators.minLength(5)]],
      category: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      level: ['', Validators.required],
      type: ['', Validators.required],
      note: [''],
    })
  }

  goBack(): void {
    this.location.back();
  }

  updateForm(): void {
    this.crudApi.updateStudy(this.editForm.value);
    this.toastr.success(`${this.editForm.controls['subject'].value as string} updated successfully`);
    void this.router.navigate(['study']);
  }
}
