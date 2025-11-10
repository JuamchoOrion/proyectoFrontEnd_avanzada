import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-destination-info',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './destination-info.html',
  styleUrls: ['./destination-info.css'],
})
export class DestinationInfo {
  @Input() destination: any;
}
