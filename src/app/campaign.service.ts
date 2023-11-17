import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: HttpClientModule
})



export class CampaignService {
  private baseUrl = '/api/campaigns';

  constructor(private http: HttpClient) {}

    httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // Dodaj inne nagłówki, jeśli są potrzebne
    })
  };
  

  getAllCampaigns(): Observable<any> {
    this.http.get(this.baseUrl, this.httpOptions).subscribe(
        (data) => {
          console.log(data)
        },
        (error) => {
          console.error('Błąd w zapytaniu HTTP:', error);
        }
      );
      return this.http.get(this.baseUrl, this.httpOptions);
  }

  getCampaignById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCampaign(campaign: any): Observable<any> {
    return this.http.post(this.baseUrl, campaign);
  }

  updateCampaign(id: string, campaign: any): Observable<any> {
    const { _id, ...updatedCampaign } = campaign;

 
    return this.http.put(`${this.baseUrl}/${id}`, updatedCampaign);
  }

  deleteCampaign(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}