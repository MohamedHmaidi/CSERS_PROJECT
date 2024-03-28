import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Incident } from '../incident';
import { IncidentService } from '../incident.service';
import { TypeIncident } from '../type-incident';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-incident',
  templateUrl: './update-incident.component.html',
  styleUrls: ['./update-incident.component.css']
})
export class UpdateIncidentComponent implements OnInit {
  incident: Incident = new Incident(); 
  typesIncident: TypeIncident[];

  constructor(private route: ActivatedRoute, private incidentService: IncidentService,private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id'); 
    this.getIncidentDetails(id);
    this.getTypesIncident();
  }

  getIncidentDetails(id: number): void {
    this.incidentService.getIncidentById(id)
      .subscribe(incident => this.incident = incident);
  }

  getTypesIncident(): void {
    this.incidentService.getTypesIncident()
      .subscribe(types => this.typesIncident = types);
  }

  updateIncident(): void {
    this.incidentService.updateIncident(this.incident)
      .subscribe(() => {
        this.snackBar.open('Incident Updated successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['bg-green-500', 'text-white']
        });
        this.router.navigate(['/incidents']); 
      });
}}