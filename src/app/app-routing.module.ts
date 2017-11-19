import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { StatsComponent } from './stats/stats.component'
import { RouterGuard } from './app-routes.resolver'
import { WelcomeComponent } from './welcome/welcome.component'

const appRoutes: Routes = [
  {
    path: '',
    resolve: {
      routes: RouterGuard
    },
    children: [
      { path: '', component: WelcomeComponent, pathMatch: 'full' },
      { path: ':section/:id', component: StatsComponent },
      { path: ':section', redirectTo: ':section/', pathMatch: 'full' },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  static components = [
    StatsComponent,
    WelcomeComponent
  ]
}
