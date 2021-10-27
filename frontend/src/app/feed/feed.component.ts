import { Component, OnInit } from '@angular/core';

import { PostService } from '../service/post.service';
import { Post } from '../model/Post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {

  listPost: Post[];
  post: Post = new Post;
  titulo: string = 'Comentários adicionados';
  nome: string = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.findPosts()
  }

    update() {
      this.titulo = 'Comentários adicionados';
      this.nome = '';
      this.ngOnInit();
    }

  findPosts() {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.listPost = data;
    })
  }

  cadastrarMensagem() {
    this.postService.postMensagem(this.post).subscribe((data: Post) => {
      this.post = data
      location.assign('/feed')
    })
  }

  pesquisarMensagem(){
    this.postService.getPosts().subscribe((data: Post[]) => {
      let newObject = data.filter((value) => {
      return value.nome.indexOf(this.nome) != -1 ? value: null
      });
      this.titulo = 'Resultados de Pesquisa';
      this.listPost = newObject;
  })
  }


}
