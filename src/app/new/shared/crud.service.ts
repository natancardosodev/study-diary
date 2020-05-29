import { Injectable } from '@angular/core';
import { 
  AngularFireList,
  AngularFireObject,
  AngularFireDatabase
} from '@angular/fire/database';

import { Study } from 'src/app/new/shared/study';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  studiesRef: AngularFireList<any>;
  studyRef: AngularFireObject<any>

  constructor(
    private db: AngularFireDatabase
  ) { }

  AddStudy(study: Study) {
    this.studiesRef.push({
      subject: study.subject,
      category: study.category,
      date: study.date,
      time: study.time,
      level: study.level,
      type: study.type,
      note: study.note
    })
  }

  GetStudy(id: string) {
    this.studyRef = this.db.object('study/' + id);
    return this.studyRef;
  }

  GetStudysList() {
    this.studiesRef = this.db.list('study');
    return this.studiesRef;
  }

  UpdateStudy(study: Study) {
    this.studyRef.update({
      subject: study.subject,
      category: study.category,
      date: study.date,
      time: study.time,
      level: study.level,
      type: study.type,
      note: study.note
    })
  }  

  DeleteStudy(id: string) { 
    this.studyRef = this.db.object('study/'+id);
    this.studyRef.remove();
  }

}
