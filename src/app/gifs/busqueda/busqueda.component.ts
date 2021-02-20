import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  @ViewChild('txtBuscar') 
  txtBuscar!:ElementRef<HTMLInputElement>;

  constructor( private gifsServide: GifsService ) {}

  buscar() {
    
    const valor =  this.txtBuscar.nativeElement.value;

    if( valor.trim().length === 0 ){ return;} /* no de datos al presionar enter en vacío*/

    this.gifsServide.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = '';
  }

}
