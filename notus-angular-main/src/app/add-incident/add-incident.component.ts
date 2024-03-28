import { Component, OnInit } from '@angular/core';
import { Incident } from '../incident';
import { TypeIncident } from '../type-incident';
import { IncidentService } from '../incident.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css']
})
export class AddIncidentComponent implements OnInit {
  typesIncident: TypeIncident[];
  incident: Incident = new Incident(); 

  constructor(private incidentService: IncidentService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getTypesIncident();
  }

  getTypesIncident(): void {
    this.incidentService.getTypesIncident()
      .subscribe(types => this.typesIncident = types);
  }

  addIncident(): void {
    
    if (!this.incident.typeIncident || !this.incident.localisation) {
      this.snackBar.open('Please fill in all required fields!', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['bg-red-500', 'text-white']
      });
      return;
    }
  
    
    this.incident.status = 'IN_PROGRESS';

   
    const newIncident: Incident = {
      localisation: this.incident.localisation,
      description: this.incident.description,
      typeIncident: this.incident.typeIncident,
      status: this.incident.status 
    } as Incident;

   
    this.incidentService.addIncident(newIncident)
      .subscribe(() => {
        
        this.snackBar.open('Incident added successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['bg-green-500', 'text-white']
        });
        
        this.router.navigate(['/incidents']); 
      });
  }
}
