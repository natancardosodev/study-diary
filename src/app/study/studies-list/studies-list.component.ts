import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

import { CrudService } from '../shared/crud.service';
import { Study } from '../shared/study';

@Component({
    selector: 'app-studies-list',
    templateUrl: './studies-list.component.html',
    styleUrls: ['./studies-list.component.scss']
})
export class StudiesListComponent implements OnInit {

    p = 1;
    studies: Study[];
    hideWhenNoStudy = false;
    noData = false;
    preLoader = true;

    constructor (
        public crudApi: CrudService,
        public toastr: ToastrService
    ){ }

    ngOnInit (): void {
        this.dataState();
        const list = this.crudApi.getStudiesList();
        list.snapshotChanges().subscribe(data => {
            this.studies = [];
            data.forEach(item => {
                const data = item.payload.toJSON();
                data['$key'] = item.key;
                this.studies.push(data as Study);
            });
        });
    }

    dataState (): void {
        this.crudApi.getStudiesList().valueChanges().subscribe(data => {
            this.preLoader = false;

            if (data.length <= 0) {
                this.hideWhenNoStudy = false;
                this.noData = true;
            } else {
                this.hideWhenNoStudy = true;
                this.noData = false;
            }
        });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    deleteStudy (study: any): void {
        void Swal.fire({
            title: 'Are sure you want to delete?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                this.crudApi.deleteStudy(study.$key as string); //eslint-disable-line @typescript-eslint/no-unsafe-member-access
                void Swal.fire(
                    'Successfully deleted!',
                    '',
                    'success'
                );
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                void Swal.fire(
                    'Cancelled',
                    'The record is safe.',
                    'error'
                );
            }
        });
    }

    moreInfo (study: Study): void {
        void Swal.fire({
            title: study.subject,
            html:
        `<strong>Category:</strong> ${study.category}<br>
        <strong>Type:</strong> ${study.type} - <strong>Level:</strong> ${study.level}<br>
        <strong>Date:</strong> ${new Date(study.date).toLocaleString('pt-BR', {timeZone: 'UTC'}).substr(0, 10)} - 
        <strong>Time:</strong> ${study.time}h<br>
        <strong>Note:</strong> ${study.note || 'There is no registered note'}`,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });
    }

}
