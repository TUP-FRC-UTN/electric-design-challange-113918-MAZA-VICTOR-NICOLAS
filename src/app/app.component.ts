import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BudgetFormComponent } from "./budget-form/budget-form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BudgetFormComponent, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'electric-design-challange';
}
