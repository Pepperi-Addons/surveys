import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'block-editor',
    templateUrl: './block-editor.component.html',
    styleUrls: ['./block-editor.component.scss']
})
export class BlockEditorComponent implements OnInit {
    @Input() hostObject: any;

    @Output() hostEvents: EventEmitter<any> = new EventEmitter<any>();

    constructor(private translate: TranslateService) {
    }

    ngOnInit(): void {
        if (!this.hostObject.configuration) {
            this.hostObject.configuration = {};
        }

        if (!this.hostObject.configuration.surveyModel) {
            this.hostObject.configuration.surveyModel = JSON.stringify({
                elements: [{
                    name: "FirstName",
                    title: "Enter your first name:",
                    type: "text"
                  }, {
                    name: "LastName",
                    title: "Enter your last name:",
                    type: "text"
                  }]
            })
            this.applyChanges()
        }
    }

    ngOnChanges(e: any): void {
    }

    modelChanged(data: string) {
        console.log("model changed")
        console.log(data)
        this.hostObject.configuration.surveyModel = data
        this.applyChanges()
    }

    applyChanges() {
        this.hostEvents.emit({
            action: 'set-configuration',
    
            // any object that the block wants to save on the configuration
            configuration: this.hostObject.configuration
        })
    }
}
