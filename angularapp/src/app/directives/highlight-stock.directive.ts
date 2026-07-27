import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlightStock]'
})
export class HighlightStockDirective implements OnChanges {
  @Input() stockQuantity:number=0;
  constructor(private elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    const element = this.elementRef.nativeElement as HTMLElement;
    if (changes['stockQuantity']) {
      if (this.stockQuantity <= 10) {
        element.style.color = 'red';
        element.style.fontWeight = 'bold';
      }else {
        element.style.color='';
        element.style.fontWeight='';
      }
    }
  }
}
