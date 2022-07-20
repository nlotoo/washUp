import { AfterContentInit, Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';

@Component({
  selector: 'app-edit-comment-page',
  templateUrl: './edit-comment-page.component.html',
  styleUrls: ['./edit-comment-page.component.css']
})
export class EditCommentPageComponent implements OnInit {

  constructor(private ServiceComponent: MainServiceService, private fb: FormBuilder, private route: Router) { }

  username: any = localStorage.getItem('email')
  data: any
  sendingData: any
  id: any = window.location.pathname.slice(19)



  ngOnInit(): void {

    this.ServiceComponent.loadCommentEditPage(this.id)
      .subscribe((result) => {
        this.data = result
        this.colectData(this.data)
      })
    this.colectData()


  }
  colectData(data?: any) {
    
    return this.sendingData = this.fb.group({
      textarea: [`${this.data?.content}`, Validators.required]
    })

  }
  newData(data?: any) {
    let objData = {
      id: this.id,
      data: data
    }
    return this.ServiceComponent.editComment(objData)
  }
  deleteComment() {
    this.ServiceComponent.deleteComment(this.id)
  }




}
