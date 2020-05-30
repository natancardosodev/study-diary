import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { CrudService } from '../shared/crud.service';
import { Study } from '../shared/study';

@Component({
  selector: 'app-studies-list',
  templateUrl: './studies-list.component.html',
  styleUrls: ['./studies-list.component.scss']
})
export class StudiesListComponent implements OnInit {
  
  p: number = 1;
  studies: Study[];
  hideWhenNoStudy: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  

  constructor(
    public crudApi: CrudService,
    public toastr: ToastrService
  ){ }


  ngOnInit() {
    this.dataState();
    let s = this.crudApi.getStudiesList(); 
    s.snapshotChanges().subscribe(data => {
      this.studies = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.studies.push(a as Study);
      })
    })
  }

  dataState() {     
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

  deleteStudy(study) {
    if (window.confirm('Are sure you want to delete this study ?')) {
      this.crudApi.deleteStudy(study.$key)
      this.toastr.success(`${study.firstName} successfully deleted!`);
    }
  }

  moreInfo(study) {  
    if (study.note) {
      this.toastr.success(study.note);
    } else {
      this.toastr.error('There is no registered note.')
    }
  }

}
