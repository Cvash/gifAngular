import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey      : string = 'x53olZO9AeRYHNdCEkmGejaGnwDHwMzo';
  private servicioURL : string = 'https://api.giphy.com/v1/gifs';
  private _historial  : string[] = [];

  
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ) { /* Se llama una unica vez el constructor */

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if( localStorage.getItem('historilal') ){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    // }

  }

  buscarGifs( query: string ){

    query = query.trim().toLowerCase();

    if( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);  /* Para tener el tamaño de 10 item en el dashboard */
    
      localStorage.setItem( 'historial', JSON.stringify(this._historial) );
    
    }

    const params = new HttpParams()
                  .set('api_key', this.apikey)
                  .set('limit', '10')
                  .set('q', query);

    this.http.get<SearchGifsResponse>(`${ this.servicioURL }/search`, { params } )
      .subscribe( ( resp ) => {
        this.resultados = resp.data;
        localStorage.setItem( 'resultados', JSON.stringify( this.resultados ) );
    });
    
  }
  
}
