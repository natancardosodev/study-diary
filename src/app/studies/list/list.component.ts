import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { StudyService } from '../shared/study.service';
import { StudyDataService } from '../shared/study-data.service';
import { Study } from '../shared/study';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  studies: Observable<any>;

  constructor(
    private studyService: StudyService,
    private studyDataService: StudyDataService
  ) { }

  ngOnInit(): void {
    this.studies = this.studyService.getAll();
    console.log(this.studies);
    
  }

  delete(key: string) {
    this.studyService.delete(key);
  }

  edit(study: Study, key: string) {
    this.studyDataService.changeStudy(study, key)
  }

}
