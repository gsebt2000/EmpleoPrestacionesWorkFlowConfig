import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http: HttpClient) {
      console.log('Servicio listo');

  }

  getPermisosUsuarios(id: string) {
  //  return this.http.get(`http://localhost:52532/api/menu/${ id }`);
  return 0;
  }
}
