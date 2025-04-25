import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit {
  @Input() width: string = '200px';
  @Input() height: string = '200px';
  @Input() loaderPath: string = 'loader.json';
  @Input() backgroundColor: string = 'transparent';

  loaderUrl: string = '';

  constructor() {}

  ngOnInit() {
    // Use a simple div with background animation instead of Lottie
    this.loaderUrl = this.loaderPath;
  }
}
