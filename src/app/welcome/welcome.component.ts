import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {
  routes: string[] = []

  constructor(
    private route: ActivatedRoute
  ) {
    this.routes = Object.keys(route.snapshot.data.routes)
  }

  ngOnInit() {
  }

}
