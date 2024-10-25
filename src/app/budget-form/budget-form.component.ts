import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ModuleTypesService } from '../module-types.service';
import { BudgetsService } from '../budgets.service';
import { Budget, ModuleType, Zone } from '../models/budget';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { dateValidator } from '../dateValidator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css',
})
export class BudgetFormComponent implements OnInit{

  zones: Zone[] = []
  modulesTypes: ModuleType[] = []

  form: FormGroup = new FormGroup({
    client: new FormControl('', [Validators.required]),
    date: new FormControl(new Date, [Validators.required, dateValidator.validarFecha]),
    modules: new FormArray([])
  })

  get modules() {
    return this.form.controls['modules'] as FormArray
  }

  agregarModulo() {
    const moduleGroup = new FormGroup({
      zone: new FormControl('', [Validators.required]),
      module: new FormControl('', [Validators.required])
    })
    this.modules.push(moduleGroup)
  }

  quitarModulo(index: number) {
    this.modules.removeAt(index)
  }

  getModulePrice(index: number): number {
    const moduleTypeId = this.modules.at(index).get('module')?.value;
    const moduleType = this.modulesTypes.find((moduleType) => moduleType.id === moduleTypeId);
    return moduleType ? moduleType.price : 0;
  }

  getModuleSlots(index: number): number {
    const moduleTypeId = this.modules.at(index).get('module')?.value;
    const moduleType = this.modulesTypes.find((moduleType) => moduleType.id === moduleTypeId);

    const moduleSlots = moduleType ? moduleType.slots : 0;


    return moduleSlots;
  }

  validateSlots(index: number) {
    let zona = this.modules.at(index).get('zone')?.value
    let cantSlots = 3;

    for (let i = 0; i < this.modules.length; i++){
      const moduleTypeId = this.modules.at(i).get('module')?.value;
      const moduleType = this.modulesTypes.find((moduleType) => moduleType.id === moduleTypeId);

      if (moduleType != undefined){
        if (this.modules.at(i).get('zone')?.value === zona) {
          cantSlots -= moduleType.slots;
        }

        if (cantSlots < 0) {
          return true;
        }
      }
    }

    return false;
  }

  private readonly modulesService = inject(ModuleTypesService)
  private readonly budgetsService = inject(BudgetsService)

  private readonly router = inject(Router)

  sendForm() {
    console.log(this.form);

    if(this.form.valid) {
      this.budgetsService.post(this.form.value).subscribe(() => this.router.navigate(['/list']));
    }
  }

  ngOnInit(): void {
    this.zones = Object.values(Zone)
    this.modulesService.get().subscribe(data => {
      this.modulesTypes = data;
    })
  }

}
