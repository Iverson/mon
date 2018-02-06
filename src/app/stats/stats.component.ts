import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Routes, DataService } from '../shared/data.service'

import { menuAnimation } from '../shared/animation/menu.animation'

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  animations: [
    menuAnimation
  ]
})
export class StatsComponent implements OnInit {
  showChart = false
  data: any[]
  routes: Routes
  tabs: string[] = []
  timer: any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {
    this.routes = route.snapshot.data.routes
  }

  ngOnInit() {
    this.route.params
      .subscribe(p => {
        const { section, id } = p
        this.tabs = this.routes[section]
        this.data = null

        if (this.tabs && !id) {
          this.router.navigate(['../', this.tabs[0]], {
            relativeTo: this.route,
            replaceUrl: true
          })
          return
        }

        if (!this.tabs || !this.tabs.includes(id)) {
          alert(`Data for ${section}.${id} not found in routes.json.`)
          return
        }

        this.dataService.fetchChartData(section, id)
          .subscribe(
            data => this.data = data,
            r => {
              if (r.status === 404) {
                alert(`file assets/data/${section}/${id}.json not found `)
              }
            }
          )

        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          const sections     = Object.keys(this.routes)
          const tabIndex     = this.tabs.indexOf(id)
          const sectionIndex = sections.indexOf(section)
          let nextSection: string, nextTab: string

          if (tabIndex === this.tabs.length - 1) {
            nextSection = sectionIndex === sections.length - 1 ? sections[0] : sections[sectionIndex + 1]
            nextTab     = this.routes[nextSection][0]
          } else {
            nextSection = section
            nextTab     = this.tabs[tabIndex + 1]
          }

          this.router.navigate(['../../', nextSection, nextTab], {
            relativeTo: this.route,
            replaceUrl: true
          })
        }, 15000)
      })

    setTimeout(() => {
      this.menuAnimationDone()
    }, 2000)
  }

  chartType() {
    if (!this.data || !this.data.length) {
      return ''
    }

    const firstPoint = this.data[0].data[0]

    if (firstPoint.x) {
      return 'line'
    }

    if (firstPoint.name) {
      return 'bar'
    }
  }

  menuAnimationDone() {
    this.showChart = true
  }
}
