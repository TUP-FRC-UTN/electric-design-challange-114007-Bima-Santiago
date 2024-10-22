import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ModuleTypesService } from '../module-types.service';
import { BudgetsService } from '../budgets.service';
import { Budget, ModuleType, Zone } from '../models/budget';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class BudgetFormComponent implements OnDestroy, OnInit{
  /* ADDITIONAL DOCS:
    - https://angular.dev/guide/forms/typed-forms#formarray-dynamic-homogenous-collections
    - https://dev.to/chintanonweb/angular-reactive-forms-mastering-dynamic-form-validation-and-user-interaction-32pe
  */
  budget: Budget = {
    client: "",
    date: new Date(),
    modules: [{}]
  }

  zones: Zone[] = []
  modulesTypes: ModuleType[] = []

  form: FormGroup = new FormGroup({
    cliente: new FormControl('', [Validators.required]),
    fecha: new FormControl(new Date, [Validators.required, dateValidator.validarFecha]),
    modulos: new FormArray([])
  })

  get modulos() {
    return this.form.controls['modulos'] as FormArray
  }

  agregarModulo() {
    const modulo = new FormGroup({
      zona: new FormControl('', [Validators.required]),
      modulo: new FormGroup({
        id: new FormGroup(0),
        nombre: new FormControl('', [Validators.required]),
        precio: new FormControl(0),
        lugares: new FormControl(0),
      })
    })
    this.modulos.push(modulo)
  }

  quitarModulo(index: number) {
    this.modulos.removeAt(index)
  }

  private readonly modulesService = inject(ModuleTypesService)
  private readonly budgetsService = inject(BudgetsService)
  private subscription = new Subscription()
  private readonly router = inject(Router)

  sendForm() {
    console.log(this.form);

    if(this.form.valid) {
      this.budget = this.form.value as Budget

      this.subscription.add(
        this.budgetsService.post(this.budget).subscribe({
          next: (data) => alert("Budget creado"),
          error: (err) => alert("Error al crear el budget"),
          complete: () => this.router.navigate(['list'])
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log("destruido")

  }

  ngOnInit(): void {
    this.zones = Object.values(Zone)
    this.modulesService.get().subscribe(data => {
      this.modulesTypes = data;
    })
  }

}
