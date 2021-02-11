import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias:Article[] = [];

  constructor(private storage: Storage,
              public toastCtrl: ToastController) { 

    this.cargarFavoritos();

  }

  async presentToast( message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top',
    });
    toast.present();
  }

  guardarNoticia( noticia: Article) {

    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if( !existe ){      
      this.noticias.unshift( noticia );
      this.storage.set( 'favoritos' , this.noticias );
      
    }

    this.presentToast( 'Agregado a Favoritos'  )

  }

  async cargarFavoritos() {

    const favoritos = await this.storage.get('favoritos');

    //cargamos lo que hay en el storage al arreglo de noticias
    // para luego ser mostrado en la vista 

    if( favoritos ){
      this.noticias = favoritos;
    } 


  }

  borrarNoticia ( noticia: Article ) {

    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );

    this.storage.set( 'favoritos' , this.noticias );

    this.presentToast( 'Quitado a Favoritos' )

  }

}
