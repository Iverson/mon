import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core'
import { inDownListAnimation } from '../animation/slide.animation'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent implements OnInit {
  @Input() tabs: string[] = []

  constructor() { }

  ngOnInit() {
  }
}
