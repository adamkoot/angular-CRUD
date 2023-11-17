import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campaign-management',
  templateUrl: './campaign-management.component.html',
  styleUrls: ['./campaign-management.component.scss'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
})


export class CampaignManagementComponent implements OnInit {
  campaigns: any[] = [];
  campaign: any = {
    name: '',
    keywords: '',
    bidAmount: 0,
    campaignFund: 0,
    status: 'on',
    town: '',
    radius: 0
  };

  isEditMode = false;
  idToUpdate = '';


  towns = ['Miasto1', 'Miasto2', 'Miasto3'];

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.campaignService.getAllCampaigns().subscribe((data: any) => {
      this.campaigns = data;
    });
  }

  submitCampaign(): void {
    if (this.isEditMode) {
       
        
        this.updateCampaign(this.idToUpdate)
        this.idToUpdate = ''
        this.isEditMode = false
    }
    else
    this.campaignService.createCampaign(this.campaign).subscribe(() => {
      this.loadCampaigns();
      // Reset the form
      this.campaign = {
        name: '',
        keywords: '',
        bidAmount: 0,
        campaignFund: 0,
        status: 'on',
        town: '',
        radius: 0
      };
    });
  }

  editCampaign(id: string): void {
    this.isEditMode = true
    this.idToUpdate = id
    this.campaignService.getCampaignById(id).subscribe((data: any) => {
      this.campaign = data;
    });
  }

  updateCampaign(id: string): void {
    
    this.campaignService.updateCampaign(id, this.campaign).subscribe(() => {
      this.loadCampaigns();
      this.campaign = {
        name: '',
        keywords: '',
        bidAmount: 0,
        campaignFund: 0,
        status: 'on',
        town: '',
        radius: 0
      };
    });
  }

  deleteCampaign(id: string): void {
    this.campaignService.deleteCampaign(id).subscribe(() => {
      this.loadCampaigns();
    });
  }
}