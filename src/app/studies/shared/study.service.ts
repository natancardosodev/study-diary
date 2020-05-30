import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Study } from './study';

@Injectable({
  providedIn: 'root'
})
export class StudyService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  insert(study: Study): void {
    this.db.list('study').push(study)
      .then(
        (result: any) => { console.log(result.key); }
      );
  }

  update(study: Study, key: string): void {
    this.db.list('study').update(key, study)
      .catch(
        (error: any) => { console.error(error); }
      );
  }

  getAll(): Observable<any> {
    return this.db.list('study')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({
            key: c.payload.key,
            ...c.payload.val() as {}
          }));
        })
      );
  }

  delete(key: string): void {
    this.db.object(`study/${key}`).remove();
  }
}
