import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

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

    ngOnInit(): void {
        this.crudApi.GetStudysList();
        this.studenForm();
    }

    // Reactive student form
    studenForm(): void {
        this.studyForm = this.fb.group({
            subject: ['', [Validators.required]],
            category: ['', [Validators.required]],
            date: ['', [Validators.required]],
            time: ['', [Validators.required]],
            level: ['', [Validators.required]],
            type: ['', [Validators.required]],
            note: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            // // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            // mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
        });
    }

    get subject(): AbstractControl {
        return this.studyForm.get('subject');
    }

    get category(): AbstractControl {
        return this.studyForm.get('category');
    }

    get date(): AbstractControl {
        return this.studyForm.get('date');
    }

    get time(): AbstractControl {
        return this.studyForm.get('time');
    }

    get level(): AbstractControl {
        return this.studyForm.get('level');
    }

    get type(): AbstractControl {
        return this.studyForm.get('type');
    }

    get note(): AbstractControl {
        return this.studyForm.get('note');
    }

    get firstName(): AbstractControl {
        return this.studyForm.get('firstName');
    }

    get lastName(): AbstractControl {
        return this.studyForm.get('lastName');
    }

    resetForm(): void {
        this.studyForm.reset();
    }

    submitStudyData(): void {
        this.crudApi.AddStudy(this.studyForm.value);
        this.toastr.success(`${this.studyForm.controls.subject.value} successfully added!`);
        this.resetForm();
    }

}
