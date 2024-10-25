import { Component, inject, OnInit } from '@angular/core';
import { BudgetsService } from '../budgets.service';
import { Budget } from '../models/budget';
import { Router } from '@angular/router';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css',
})
export class BudgetListComponent implements OnInit{

  budgets: Budget[] = [];

  private budgetService = inject(BudgetsService);
  private readonly router = inject(Router)

  ngOnInit(): void {
    this.budgetService.get().subscribe(data => {
      this.budgets = data;
    })
  }

  ver(index: string | undefined) {
    if (index != undefined) {
      this.router.navigate([`/view/${index}`])
    }
  }
}
