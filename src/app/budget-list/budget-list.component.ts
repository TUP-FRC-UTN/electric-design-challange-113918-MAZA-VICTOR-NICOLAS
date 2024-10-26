import { Component } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../models/budget';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css',
})
export class BudgetListComponent {
  /* ADDITIONAL DOCS:
    - https://angular.dev/guide/components/lifecycle#
    - https://angular.dev/guide/http/making-requests#http-observables
    - https://angular.dev/guide/http/setup#providing-httpclient-through-dependency-injection
    - https://angular.dev/guide/http/making-requests#setting-request-headers
    - https://angular.dev/guide/http/making-requests#handling-request-failure
    - https://angular.dev/guide/http/making-requests#best-practices (async pipe)
    - https://angular.dev/guide/testing/components-scenarios#example-17 (async pipe)

  
  */
budgets:Budget[] = [];

    constructor(private budgetservice: BudgetService){
    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.budgetservice.getBudgets().subscribe(
        (next)=> this.budgets = next,
        (error)=> console.log(error)
      )
    }
}
