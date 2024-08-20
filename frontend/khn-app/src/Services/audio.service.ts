import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private http: HttpClient) { }

  getTodos() : Observable<any> {
    return this.http.get<any[]>('http://localhost:55872/api/audio');
  }
}
