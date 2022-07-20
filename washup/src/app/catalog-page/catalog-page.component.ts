import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { MainServiceService } from '../services/main-service.service';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {
  items: any

  constructor(private ServiceComponent: MainServiceService, private route: Router) {
    this.ServiceComponent.getAllItems().subscribe((ee) => {
      this.items = ee
    })
  }

  ngOnInit(): void {


  }




}






