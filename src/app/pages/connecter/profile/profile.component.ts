import {Component, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {Profile} from '../../../models/profile.model';
import {ProfileService} from '../../../services/profile/profile.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    MatTabsModule,
    DatePipe
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile!: Profile;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (profile: Profile) => {
        this.profile = profile;
      },
      error: (err) => console.error("Erreur lors de la recuperation du profile", err)
    })
  }
}
