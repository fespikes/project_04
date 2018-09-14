import { Directive, Input, OnChanges, ElementRef } from '@angular/core';

const IMAGE_PREFIX = '/assets/svg/';

@Directive({
  selector: '[erpImgSrc]',
})
export class ImgSrcDirective implements OnChanges {
  @Input() erpImgSrc: string;
  @Input() erpImgPrefix: string;

  constructor(private el: ElementRef) {}

  makeImgSrc() {
    return location.origin + (this.erpImgPrefix || IMAGE_PREFIX) + this.erpImgSrc;

  }

  ngOnChanges() {
    if (this.erpImgSrc) {
      this.el.nativeElement.src = this.makeImgSrc();
    }
  }
}
