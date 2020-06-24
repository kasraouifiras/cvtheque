import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http:HttpClient) { }

  getCandidates(){
    return this.http.get('http://127.0.0.1:8000/api/candidates')
  }

  addCandidate(data){
    return this.http.post('http://127.0.0.1:8000/api/candidates',data)
  }

  getCandidate(id){
    return this.http.get('http://127.0.0.1:8000/api/candidates/'+id)
  }

  updateCandidate(data){
    return this.http.put('http://127.0.0.1:8000/api/candidates',data)
  }

  deleteCandidate(id){
    return this.http.delete('http://127.0.0.1:8000/api/candidates/'+id)
  }

}
