import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {

  item: any
  authorBoolean: boolean = false


  constructor(private route: ActivatedRoute, private ServiceComponent: MainServiceService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.ServiceComponent.getOneItem(data['id']).subscribe((itemById) => {
        this.item = itemById
        let locastorageID = localStorage.getItem('User ID')
        this.authorBoolean = this.item.author == locastorageID
      })

    })

  }






  deleteItem() {
    let id = this.item._id
    return this.ServiceComponent.deleteOne(id)
  }

}
