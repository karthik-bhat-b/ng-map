import { Component } from '@angular/core';
import { RuleSet } from 'src/app/models/Rule';

@Component({
  selector: 'app-rule-editor',
  templateUrl: './rule-editor.component.html',
  styleUrls: ['./rule-editor.component.css']
})
export class RuleEditorComponent {
  ruleSets: RuleSet[] = [];
  newRuleSet: RuleSet = {
    rules: [],
    color: 'green'
  };

  addRule() {
    this.newRuleSet.rules.push({ attribute: '', value: '' });
  }

  removeRule(index: number) {
    this.newRuleSet.rules.splice(index, 1);
  }

  addRuleSet() {
    if (this.newRuleSet.rules.length > 0) {
      this.ruleSets.push({ ...this.newRuleSet });
      this.newRuleSet.rules = [];
      this.newRuleSet.color = 'green';
    }
  }

  removeRuleSet(index: number) {
    this.ruleSets.splice(index, 1);
  }
}
