import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MainServiceService } from '../services/main-service.service';

@Component({
  selector: 'app-comments-page',
  templateUrl: './comments-page.component.html',
  styleUrls: ['./comments-page.component.css']
})
export class CommentsPageComponent implements OnInit {

  constructor(private ServiceComponent: MainServiceService, private route: Router) { }

  coments: any

  authChek: any
  flag: any = localStorage.getItem('User ID')

  ngOnInit(): void {
    this.laodComments()
  }

  laodComments() {

    let itemId = window.location.pathname.slice(6)
    this.ServiceComponent.loadComment(itemId)
      .subscribe({
        next: (data) => {
          data.map((arrayRow: any) => {
            let userID = localStorage.getItem('User ID')

            return arrayRow.likes.likes.find((likesRow: any) => {
              if (likesRow == userID) {
                arrayRow.likeButton = true

              }
            })
          })
          this.coments = data
        },
        error: (err) => {
          console.log(err)

        }
      })

  }

  like(commentID: any) {
    let liker = localStorage.getItem('User ID')
    let IDcomment = commentID

    let data = {
      userID: liker,
      commentID: IDcomment
    }
    this.ServiceComponent.likeComment(data).subscribe(
      {
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.log(err)

        }
      }
    )
  }

  dislike(commentID: any) {
    let liker = localStorage.getItem('User ID')
    let data = {
      commentID: commentID,
      userID: liker
    }

    this.ServiceComponent.dislikeComment(data).subscribe({
      next: () => {

        window.location.reload();
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
