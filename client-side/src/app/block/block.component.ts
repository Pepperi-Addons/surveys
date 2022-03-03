import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StylesManager, Model, SurveyNG } from 'survey-angular';

@Component({
    selector: 'block',
    templateUrl: './block.component.html',
    styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    constructor(private translate: TranslateService) {
    }

    ngOnInit(): void {
        StylesManager.applyTheme('modern');
        this.applySurvey()
    }

    ngOnChanges(e: any): void {
        this.applySurvey()
    }

    onComplete(sender: any) {
        const result = JSON.stringify(sender.data);
        window.alert(result);
    }

    applySurvey() {
        if (this.hostObject.configuration) {
            const surveyJson = this.hostObject.configuration.surveyModel;
            if (surveyJson) {
                const survey = new Model(JSON.parse(surveyJson));
                SurveyNG.render("surveyContainer", { model: survey });
                survey.onComplete.add(this.onComplete);
            }
        }
    }
}
