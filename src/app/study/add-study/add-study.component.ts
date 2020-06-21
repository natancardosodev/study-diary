import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { CrudService } from '../shared/crud.service';
import { categories, levels, types } from '../shared/Const';

@Component({
    selector: 'app-add-study',
    templateUrl: './add-study.component.html',
    styleUrls: ['./add-study.component.scss']
})
export class AddStudyComponent implements OnInit {

    public categories = categories;
    public levels = levels;
    public types = types;
    public dateConfig = {
        isAnimated: true,
        dateInputFormat: 'DD/MM/YYYY'
    };
    public studyForm: FormGroup;

    constructor (
        public crudApi: CrudService,
        public fb: FormBuilder,
        public toastr: ToastrService
    ) { }

    ngOnInit (): void {
        this.crudApi.getStudiesList();
        this.dadosForm();
    }

    dadosForm (): void {
        this.studyForm = this.fb.group({
            subject: ['', [Validators.required]], // eslint-disable-line @typescript-eslint/unbound-method
            category: ['', [Validators.required]], // eslint-disable-line @typescript-eslint/unbound-method
            date: ['', [Validators.required]], // eslint-disable-line @typescript-eslint/unbound-method
            time: ['', [Validators.required]], // eslint-disable-line @typescript-eslint/unbound-method
            level: ['', [Validators.required]], // eslint-disable-line @typescript-eslint/unbound-method
            type: ['', [Validators.required]], // eslint-disable-line @typescript-eslint/unbound-method
            note: [''], // eslint-disable-line @typescript-eslint/unbound-method
            // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            // mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
        });
    }

    get subject (): AbstractControl {
        return this.studyForm.get('subject');
    }

    get category (): AbstractControl {
        return this.studyForm.get('category');
    }

    get date (): AbstractControl {
        return this.studyForm.get('date');
    }

    get time (): AbstractControl {
        return this.studyForm.get('time');
    }

    get level (): AbstractControl {
        return this.studyForm.get('level');
    }

    get type (): AbstractControl {
        return this.studyForm.get('type');
    }

    get note (): AbstractControl {
        return this.studyForm.get('note');
    }

    resetForm (): void {
        this.studyForm.reset();
    }

    submitStudyData (): void {
        this.crudApi.addStudy(this.studyForm.value);
        this.toastr.success(`${this.studyForm.controls.subject.value as string} successfully added!`);
        this.resetForm();
    }
}
