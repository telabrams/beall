import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'ba-post-place-holder',
  template: `
    <div class="timeline-wrapper" [ngClass]="className">
      <div class="timeline-item">
        <div class="animated-background facebook">
          <div class="background-masker header-top"></div>
          <div class="background-masker header-left"></div>
          <div class="background-masker header-right"></div>
          <div class="background-masker header-bottom"></div>
          <div class="background-masker subheader-left"></div>
          <div class="background-masker subheader-right"></div>
          <div class="background-masker subheader-bottom"></div>
          <div class="background-masker content-top"></div>
          <div class="background-masker content-first-end"></div>
          <div class="background-masker content-second-line"></div>
          <div class="background-masker content-second-end"></div>
          <div class="background-masker content-third-line"></div>
          <div class="background-masker content-third-end"></div>
        </div>
      </div>
    </div>`,
  styleUrls: ['post-place-holder.scss']
})
export class PostPlaceHolderComponent implements OnInit {
  @Input() className;

  constructor() {
  }

  ngOnInit() {
  }

}
