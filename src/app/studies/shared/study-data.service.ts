import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Study } from './study';

@Injectable({
  providedIn: 'root'
})
export class StudyDataService {

  private studySource = new BehaviorSubject({
    study: null,
    key: '',
  });
  currentStudy = this.studySource.asObservable();

  constructor() { }

  changeStudy(study: Study, key: string) {
    this.studySource.next({
      study: Study,
      key
    });
  }

}
