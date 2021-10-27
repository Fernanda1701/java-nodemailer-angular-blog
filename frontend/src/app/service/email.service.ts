import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpService } from "./http.service";
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  constructor(public http: HttpService) { }

  sendEmail(nome: String, email: String, mensagem: String) {
    let user = {
      name: nome,
      email: email,
      message: mensagem
    }
    this.http.sendEmail("http://localhost:3001/sendmail", user).subscribe(
      data => {
        let res:any = data;
        console.log(`email has been sent and the message id is ${res.messageId}`);
      },
      err => {
        console.log(err);
      }
    );
  }
}
