import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  get historial() {
    return this.gifsService.historial;
  }

  constructor( private gifsService: GifsService ) { }

  buscar( termino: string  ) {
    /* Esto devuelve los gif elegidos en el sidebar con el evento click de sidebar html */
    this.gifsService.buscarGifs( termino );
  }

}
