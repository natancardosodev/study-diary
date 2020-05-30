import { Component, OnInit } from "@angular/core";

import { Study } from "../shared/study";
import { StudyService } from "../shared/study.service";
import { StudyDataService } from "../shared/study-data.service";

@Component({
    selector: "app-edit",
    templateUrl: "./edit.component.html",
    styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit {
    study: Study;
    key = "";

    constructor(
        private studyService: StudyService,
        private studyDataService: StudyDataService
    ) { }

    ngOnInit(): void {
        this.study = new Study();
        this.studyDataService.currentStudy.subscribe((data) => {
            if (data.study && data.key) {
                this.study = new Study();
                this.study.subject = data.study.subject;
                this.study.category = data.study.category;
                this.study.date = data.study.date;
                this.study.time = data.study.time;
                this.study.level = data.study.level;
                this.study.type = data.study.type;
                this.study.note = data.study.note;
                this.key = data.key;
            }
        });
    }

    onSubmit(): void {
        if (this.key) {
            this.studyService.update(this.study, this.key);
        } else {
            this.studyService.insert(this.study);
        }

        this.study = new Study();
    }
}
