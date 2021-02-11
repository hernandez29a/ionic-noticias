import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/service/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor( private noticiasService: NoticiasService ) {}
  
  ngOnInit(): void {
    this.cargarNoticias();
  }
  
  loadData( event ) {
    
    this.cargarNoticias( event);
    
    
  }
  
  cargarNoticias( event? ) {
    this.noticiasService.getTopHeadLines()
      .subscribe( resp => {
        //console.log(resp);

        if( resp.articles.length === 0 ) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }

        //mostrar la informacion del api
        this.noticias.push(...resp.articles);

        if( event ){
          event.target.complete();
        }


      });
  }


  

}