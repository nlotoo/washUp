import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MainServiceService } from '../services/main-service.service';
import { AddItemFace } from '../interfaces/addItemFace'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {


  addItemForm: any
  warningMessage: any

  constructor(private fb: FormBuilder, private ServiceComponent: MainServiceService, private route: Router) {


  }

  ngOnInit(): void {
    this.addItemForm = this.fb.group({
      itemName: ['', [Validators.required]],
      color: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }
  addItem() {

    let answer: AddItemFace = this.addItemForm.value

    this.ServiceComponent.newAddItem(answer).subscribe({
      next: () => {
        this.route.navigate(['/catalog'])
      },
      error: (err: any) => {
        this.warningMessage = err.error.message
      }
    })
  }

  form(): void {

  }

}
