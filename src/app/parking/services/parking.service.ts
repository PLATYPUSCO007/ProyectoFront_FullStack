import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Estacionamiento } from '../interfaces/estacionamiento.interface';
import { Vehiculo } from '../interfaces/vehiculo.interface';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {

  private baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  setEstacionamiento(estacionamiento: Estacionamiento): Observable<number>
  {
    return this.http.post<number>(`${this.baseURL}estacionamiento`, estacionamiento);
  }

  getOrCreateVehiculo(placa: string): Observable<Vehiculo>
  {
    return this.http.get<Vehiculo>(`${this.baseURL}vehiculos/${placa}`);
  }

  getLastEstacionamiento(placa: string): Observable<Estacionamiento[]>
  {
    return this.http.get<Estacionamiento[]>(`${this.baseURL}estacionamiento/${placa}`);
  }

  updateEstacionamiento(estacionamiento: Estacionamiento): Observable<Estacionamiento>
  {
    return this.http.put<Estacionamiento>(`${this.baseURL}estacionamiento/${estacionamiento.id}`, estacionamiento);
  }

  updateVehiculo(vehiculo: Vehiculo): Observable<any>
  {
    return this.http.put<any>(`${this.baseURL}vehiculos/${vehiculo.placa}`, vehiculo);
  }

  deleteOficial(): Observable<number>
  {
    return this.http.delete<number>(`${this.baseURL}estacionamiento/deleteOficial`);
  }

  updateResidente(): Observable<number>
  {
    return this.http.post<number>(`${this.baseURL}estacionamiento/updateResidente`, {});
  }

  generateFile(nameFile: string): Observable<Blob>
  {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/csv');
    return this.http.get<Blob>(`${this.baseURL}file/${nameFile}`, {headers: headers, responseType: 'blob' as 'json'});
  }
}
