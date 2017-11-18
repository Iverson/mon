import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'

import { MenuComponent } from './menu/menu.component'
import { ChartModule } from './chart/chart.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    MenuComponent
],
  exports: [
    MenuComponent,
    ChartModule,
    HttpModule
  ]
})
export class SharedModule { }
