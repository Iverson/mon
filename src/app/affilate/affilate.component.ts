import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { DATA_MOCK } from './data.mock'
import { menuAnimation } from '../shared/animation/menu.animation'

@Component({
  selector: 'app-affilate',
  templateUrl: './affilate.component.html',
  animations: [
    menuAnimation
  ]
})
export class AffilateComponent implements OnInit {
  showChart = false
  data = DATA_MOCK['all']

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params
      .map(p => p['id'])
      .subscribe(id => {
        this.data = DATA_MOCK[id]
      })
  }

  ngOnInit() {
  }

  menuAnimationDone() {
    this.showChart = true
  }
}
