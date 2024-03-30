import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importez MatSnackBar

import { TypeIncident } from '../type-incident';
import { TypeIncidentService } from '../type-incident.service';

@Component({
  selector: 'app-add-incident-type',
  templateUrl: './add-incident-type.component.html',
  styleUrls: ['./add-incident-type.component.css']
})
export class AddIncidentTypeComponent implements OnInit {
  newTypeIncident: TypeIncident = new TypeIncident();

  constructor(
    private typeIncidentService: TypeIncidentService,
    private router: Router,
    private snackBar: MatSnackBar 
  ) { }

  ngOnInit(): void {
  }

  addTypeIncident(): void {
    this.typeIncidentService.addTypeIncident(this.newTypeIncident).subscribe(
      response => {
        console.log('Type d\'incident ajouté avec succès:', response);
       
        this.snackBar.open('Type d\'incident ajouté avec succès!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['bg-green-500', 'text-blue'] 
        });
        
        this.router.navigate(['/TypeIncidents']);
       
        this.newTypeIncident = new TypeIncident();
      },
      error => {
        console.error('Erreur lors de l\'ajout du type d\'incident:', error);
      }
    );
  }
}
