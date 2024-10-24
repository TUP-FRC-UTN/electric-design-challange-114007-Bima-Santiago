import { Component, inject } from '@angular/core';
import { BudgetsService } from '../budgets.service';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [],
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

    private readonly budgetService = inject(BudgetsService);
}
