import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModuleType, Zone } from '../models/budget';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';
import { minimoCincoModulos } from '../validators/minimo-modulos.validator';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css',
})
export class BudgetFormComponent implements OnInit {
  /* ADDITIONAL DOCS:
    - https://angular.dev/guide/forms/typed-forms#formarray-dynamic-homogenous-collections
    - https://dev.to/chintanonweb/angular-reactive-forms-mastering-dynamic-form-validation-and-user-interaction-32pe
  */
  budgetForm: FormGroup;
  moduleTypes: ModuleType[] = [];
  zone!: Zone;
  zoneOptions = Object.values(Zone);

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.budgetForm = this.fb.group({
      fecha: ['', [Validators.required, this.validateFecha]],
      cliente: ['', Validators.required],
      modulos: this.fb.array([], [Validators.required, minimoCincoModulos])
    });
  }

  get modulos() {
    return this.budgetForm.get('modulos') as FormArray;
  }


  ngOnInit(): void {
    this.loadModules();
    console.log('modulos',this.modulos)
  }

  validateFecha(control: FormControl) {
    const fecha = new Date(control.value);
    const hoy = new Date();
    if (fecha > hoy) {
      return { invalidFecha: true };
    }
    return null;
  }
  loadModules(){
    this.budgetService.getModules().subscribe(
      (next)=>this.moduleTypes = next,
      (error)=> console.log(error)
    )
  }
  addModulo() {
    const moduleGroup = this.fb.group({
      tipo: ['', Validators.required], 
      precio: [{ value: 0, disabled: true }],  
      slots: [{ value: 0, disabled: true }],  
      ambiente: ['', Validators.required]  
    });
    moduleGroup.get('tipo')?.valueChanges.subscribe(selectedType => {
      const selectedModule = this.moduleTypes.find(mod => mod.name === selectedType);
      if (selectedModule) {
        moduleGroup.get('precio')?.setValue(selectedModule.price);
        moduleGroup.get('slots')?.setValue(selectedModule.slots);
      }
    });

    this.modulos.push(moduleGroup);
  }

  deleteModulo(index: number) {
    this.modulos.removeAt(index);
  }

  onSubmit() {
    if (this.budgetForm.valid) {
      console.log(this.budgetForm.value);
      this.budgetService.postBudget(this.budgetForm.value).subscribe(
        (next)=>console.log(next),
        (error)=> console.log(error)
      )
    }
  }
}
