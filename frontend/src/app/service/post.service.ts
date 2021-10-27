import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private baseURL = "http://localhost:8080/posts";

  constructor(private httpClient: HttpClient) { }

   getPosts(): Observable<Post[]> {
      return this.httpClient.get<Post[]>(`${this.baseURL}`);
    }

  postMensagem(post: Post) {
    return this.httpClient.post(`${this.baseURL}`, post)
  }

}
