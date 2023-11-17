import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: HttpClientModule
})
export class CampaignService {
  private baseUrl = '/campaigns';

  constructor(private http: HttpClient) {}

  getAllCampaigns(): Observable<any> {
    return this.http.get(this.baseUrl);
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