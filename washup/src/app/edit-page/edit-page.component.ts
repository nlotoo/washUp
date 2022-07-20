import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {


  item: any
  updateItemForm: any


  constructor(private ServiceComponet: MainServiceService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {

    this.route.params.subscribe((itemId) => {
      return this.ServiceComponet.getOneItem(itemId['id']).subscribe((data) => {
        this.item = data
        this.colectData(this.item)
      })
    })
    this.colectData()
  }

  ngOnInit(): void {  }


  colectData(data?: any) {
   return this.ReactiveFormFunc(data)
  }


  ReactiveFormFunc(data: any) {
    return this.updateItemForm = this.fb.group({
      itemName: [`${data?.itemName}`, Validators.required],
      color: [`${data?.color}`, Validators.required],
      imageUrl: [`${data?.imageUrl}`, Validators.required],
      description: [`${data?.description}`, Validators.required],
    })
  }

  updateItem() {

    let data = this.updateItemForm.value
    let id = this.item._id

    let obj: any = {
      updatedObject: data,
      itemId: id,
    }


    this.router.navigate(['/catalog'])
    this.ServiceComponet.updateOneItem(obj)

    return


  }

}
