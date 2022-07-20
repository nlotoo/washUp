import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { registerFace } from '../interfaces/registerFace';
import { environment } from 'src/environments/environment.prod';
import { map, tap } from 'rxjs';
import { Location } from '@angular/common'





import { AddItemFace } from '../interfaces/addItemFace'
import { CommentFace } from '../interfaces/commentFace'

@Injectable({
  providedIn: 'root'
})

export class MainServiceService {
  apiURL = environment.apiURL

  user2: any
  WarningMessage: any


  constructor(
    private route: Router,
    private HttpClient: HttpClient,
    private _location: Location
  ) { }


  setToken(
    key: string,
    value: string,
  ): void {
    localStorage.setItem(`${key}`, `${value}`)
  }
  clearSession() {
    localStorage.clear()
  }
  createUser(data: registerFace) {

    return this.HttpClient.post<any>(`${this.apiURL}/register`, data
    ).pipe(tap((inscriptionData) => {

      this.setToken("Session Token", `${inscriptionData['reduceUserInfo'].token}`)
      this.setToken("User ID", `${inscriptionData['reduceUserInfo'].userId}`)
      this.setToken("Email", `${inscriptionData['reduceUserInfo'].email}`)

    }))

  }
  loginUser(data: registerFace) {
    return this.HttpClient.post<any>(`${this.apiURL}/login`, data)
      .pipe(tap((inscriptionData) => {
        this.setToken("Session Token", `${inscriptionData['reduceUserInfo'].token}`)
        this.setToken("User ID", `${inscriptionData['reduceUserInfo'].userId}`)
        this.setToken("email", `${inscriptionData['reduceUserInfo'].email}`)
      }))
  }
  newAddItem(data: AddItemFace) {


    let { itemName, color, imageUrl, description, } = data
    let creator = localStorage.getItem('User ID')
    let myObj = {
      itemName: itemName,
      color: color,
      imageUrl: imageUrl,
      description: description,
      author: creator
    }

    return this.HttpClient.post<AddItemFace>(`${this.apiURL}/add-item`, myObj,{ headers: new HttpHeaders({ 'token': `${this.isLoggedOn()}` }) } )


  }
  getAllItems() {
    return this.HttpClient.get<AddItemFace>(`${this.apiURL}/catalog`, { headers: new HttpHeaders({ 'token': `${this.isLoggedOn()}` }) })
  }
  getOneItem(id: string) {
    return this.HttpClient.get(`${this.apiURL}/item/${id}`)

  }
  isLoggedOn() {
      return localStorage.getItem('Session Token')
  }
  deleteOne(id: string) {
    return this.HttpClient.get(`${this.apiURL}/delete/${id}`,{ headers: new HttpHeaders({ 'token': `${this.isLoggedOn()}` }) }).subscribe((data) => {
      this.route.navigate(['/catalog'])
      return data
    })
  }
  updateOneItem(itemId: any) {

    return this.HttpClient.post<any>(`${this.apiURL}/update-item`, itemId,{ headers: new HttpHeaders({ 'token': `${this.isLoggedOn()}` }) }).subscribe((data) => {
      console.log(data)
    })


  }
  createComment(data: any) {
    return this.HttpClient.post<CommentFace>(`${this.apiURL}/post/comment`, data).subscribe((data) => { return data })
  }
  loadComment(itemId: any) {
    return this.HttpClient.get<any>(`${this.apiURL}/load/comment/${itemId}`)
  }
  loadCommentEditPage(commentId: any) {
    return this.HttpClient.get(`${this.apiURL}/edit-comment-page/${commentId}`)
  }
  editComment(objData: any) {
    return this.HttpClient.post(`${this.apiURL}/edit-comment-page/${objData.id}`, objData)
      .subscribe({
        next: () => {
          this._location.back()
        },
        error: (err: any) => {
          // не е настроен еррора
        }
      })
  }

  deleteComment(commentId: any) {
    return this.HttpClient.delete(`${this.apiURL}/edit-comment-page/${commentId}`, commentId  ).subscribe(
      {
        next: () => {
          this._location.back()
        },
        error: (err: any) => {
          console.log(err)
          // не са  настроени еррорите
        }
      }
    )
  }

  likeComment(data: any) {
    return this.HttpClient.post(`${this.apiURL}/liked/${data.commentID}`, data)
  }

  dislikeComment(data: any) {
    return this.HttpClient.post(`${this.apiURL}/dislike/${data.commentID}`, data)

  }




}