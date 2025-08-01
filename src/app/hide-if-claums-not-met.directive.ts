import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AuthenServiceService } from './Service/authen/authen-service.service';

@Directive({
  selector: '[appHideIfClaumsNotMet]'
})
export class HideIfClaumsNotMetDirective implements OnInit{
  @Input("appHideIfClaumsNotMet") token1!:Function

  constructor(private ele : ElementRef,private rederer:Renderer2,private service : AuthenServiceService) { }
  ngOnInit(): void {
    const claim1 = this.service.getclaims();
    if(!this.token1(claim1)){
        this.ele.nativeElement.style.display="none";
        this.rederer.setStyle(this.ele.nativeElement,'color','');
    }
  }

}
