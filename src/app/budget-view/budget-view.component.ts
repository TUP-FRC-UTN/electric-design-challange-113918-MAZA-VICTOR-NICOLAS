import { Component, Input } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';
import { Budget, ModuleType } from '../models/budget';

@Component({
  selector: 'app-budget-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-view.component.html',
  styleUrl: './budget-view.component.css',
})
export class BudgetViewComponent {

  idbudget!: string;
  @Input() set id(id: string) {
    this.idbudget = id;
  }
  budgetselected!:Budget;


  groupedModules: { [key: string]: any[] } = {}; 
  boxesRequired = 0;
  totalCost = 0;
  moduleTypes: ModuleType[] = [];

  constructor(private budgetservice:BudgetService){}

  
  ngOnInit(): void {
    this.budgetservice.getBudgetById(this.idbudget).subscribe(
      (next) => {
        this.budgetselected = next;
        this.groupModulesByAmbiente();
     
      },
      (error) => console.log("error",error)
    );

    this.budgetservice.getModules().subscribe(
      (modules) => {
        this.moduleTypes = modules;
        this.completeModuleInfo();
        this.calculateBoxesRequired();
        this.calculateTotalCost();
      },
      (error) => console.log(error)
    );
  }
  completeModuleInfo() {
    this.budgetselected.modulos.forEach((mod: any) => {
      const moduleType = this.moduleTypes.find((type) => type.name === mod.tipo);
      if (moduleType) {
        mod.slots = moduleType.slots;
        mod.precio = moduleType.price;
      }
    });
  }

  groupModulesByAmbiente() {
    this.groupedModules = {};
    this.budgetselected.modulos.forEach((mod: any) => {
      const ambiente = mod.ambiente;
      if (!this.groupedModules[ambiente]) {
        this.groupedModules[ambiente] = [];
      }
      this.groupedModules[ambiente].push(mod);
    });
  }

  getAmbientes(): string[] {
    return Object.keys(this.groupedModules);
  }

  calculateBoxesRequired() {
    let totalSlots = 0;
    this.budgetselected.modulos.forEach((mod: any) => {
      totalSlots += mod.slots;
    });
    this.boxesRequired = Math.ceil(totalSlots / 3);
  }

  calculateTotalCost() {
    this.totalCost = 0;
    this.budgetselected.modulos.forEach((mod: any) => {
      this.totalCost += mod.precio;
    });
  }
}