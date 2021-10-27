import { Component, OnInit } from '@angular/core';
import { EmailService } from '../service/email.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})

export class ContatoComponent implements OnInit {
  nomeRem : String = '';
  emailRem: String = '';
  mensagemRem: String = '';
  isShown: boolean = false;

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
  }

  enviar() {
    console.log(this.nomeRem + " - "+ this.emailRem + " - "+ this.mensagemRem);
    this.emailService.sendEmail(this.nomeRem, this.emailRem, this.mensagemRem);
    this.isShown = true;
  }

}
