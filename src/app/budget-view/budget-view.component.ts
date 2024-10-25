import { Component, inject, OnInit } from '@angular/core';
import { BudgetsService } from '../budgets.service';
import { Budget, ModuleType } from '../models/budget';
import { ActivatedRoute } from '@angular/router';
import { ModuleTypesService } from '../module-types.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-budget-view',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './budget-view.component.html',
  styleUrl: './budget-view.component.css',
})
export class BudgetViewComponent implements OnInit {
  private readonly route : ActivatedRoute = inject(ActivatedRoute);

  id :string | null = null;
  budget: Budget = {
    id: '',
    client: '',
    date: new Date(),
    modules: [{}]
  };

  modules: [{
    zone: string,
    modules: ModuleType[]
  }] = [{
    zone: '',
    modules: []
  }];

  private readonly budgetService = inject(BudgetsService);
  private readonly moduleService = inject(ModuleTypesService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = String(params.get('id'));
    });

    if (this.id == null) return;

    this.budgetService.getById(this.id).subscribe(data => {
      this.budget = data;

      data.modules.forEach(module => {

        let item: { zone: string, modules: ModuleType[] } = {
          zone: '',
          modules: []
        }

        item.zone = module.zone;

        this.moduleService.get().subscribe(data => {
          data.forEach(moduleType => {

            if (moduleType.id == module.module) {
              item.modules.push(moduleType)
            }
          })
        })

        this.modules.push(item)
      })
    })

  }

}
