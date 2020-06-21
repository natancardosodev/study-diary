import { Injectable } from '@angular/core';
import {
    AngularFireList,
    AngularFireObject,
    AngularFireDatabase
} from '@angular/fire/database';

import { Study } from 'src/app/study/shared/study';

@Injectable({
    providedIn: 'root'
})
export class CrudService {

    studiesRef: AngularFireList<Study>;
    studyRef: AngularFireObject<Study>;

    constructor (
        private db: AngularFireDatabase
    ) { }

    addStudy (study: Study): void {
        void this.studiesRef.push({
            subject: study.subject,
            category: study.category,
            date: study.date,
            time: study.time,
            level: study.level,
            type: study.type,
            note: study.note
        });
    }

    getStudy (id: string): AngularFireObject<Study> {
        this.studyRef = this.db.object('study/' + id);
        return this.studyRef;
    }

    getStudiesList (): AngularFireList<Study> {
        this.studiesRef = this.db.list('study');
        return this.studiesRef;
    }

    updateStudy (study: Study): void {
        void this.studyRef.update({
            subject: study.subject,
            category: study.category,
            date: study.date,
            time: study.time,
            level: study.level,
            type: study.type,
            note: study.note
        });
    }

    deleteStudy (id: string): void {
        this.studyRef = this.db.object('study/' + id);
        void this.studyRef.remove();
    }

}
