import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../service/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild( IonSegment) segment: IonSegment;

  categorias = ['business','entertainment', 'general', 'health', 'science', 'sports', 'technology']
  noticias: Article[] = [];
  
  constructor( private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    
  }

  //luego que carga los view se carga esto
  ngAfterViewInit(){
    this.segment.value = this.categorias[0];
    this.cargarNoticias( this.categorias[0] );
  }

  cambioCategoria( event) {

    //incicializamos el arreglo para la nueva opcion
    this.noticias = [];
    
    //cargamos las noticias de la etiqueta seleccionada
    this.cargarNoticias( event.detail.value );

  }

  cargarNoticias( categoria: string, event? ) {

    this.noticiasService.getTopHeadLinesCategoria( categoria )
      .subscribe( resp => {
        //console.log(resp);

        if( resp.articles.length === 0 ) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }

        //cargarmos las noticias de la opcion seleccionada
        this.noticias.push( ...resp.articles);

        if( event ){
          event.target.complete();
        }

      });


  }

  loadData(event) {
    this.cargarNoticias( this.segment.value, event );
  }

}
