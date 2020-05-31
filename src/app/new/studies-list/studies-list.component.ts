import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { ToastrService, ActiveToast } from 'ngx-toastr';
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
  

  constructor(
    public crudApi: CrudService,
    public toastr: ToastrService
  ){ }


  ngOnInit(): void {
    this.dataState();
    const list = this.crudApi.getStudiesList(); 
    list.snapshotChanges().subscribe(data => {
      this.studies = [];
      data.forEach(item => {
        const data = item.payload.toJSON(); 
        data['$key'] = item.key;
        this.studies.push(data as Study);
      })
    })
  }

  dataState(): any {     
    this.crudApi.getStudiesList().valueChanges().subscribe(data => {
      this.preLoader = false;

      if (data.length <= 0) {
        this.hideWhenNoStudy = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudy = true;
        this.noData = false;
      }
    })
  }

  deleteStudy(study): any {
    if (window.confirm('Are sure you want to delete this study ?')) {
      this.crudApi.deleteStudy(study.$key)
      this.toastr.success(`${study.firstName} successfully deleted!`);
    }
  }

  moreInfo(study): any {  
    if (study.note) {
      this.toastr.success(study.note);
    } else {
      this.toastr.error('There is no registered note.')
    }
  }

}
