import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do'

export interface Routes {
  [key: string]: string[]
}

@Injectable()
export class DataService {

  constructor(
    private http: Http
  ) {}

  fetchRoutes(): Observable<Routes> {
    return this.http.get('assets/data/routes.json')
      .map(r => r.json())
  }

  fetchChartData(section: string, id: string) {
    return this.http.get(`assets/data/${section}/${id}.json`)
      .map(r => r.json())
      .map(data => {
        if (typeof Object.values(data)[0] === 'object') {
          return Object
            .keys(data)
            .map(k => ({
              name: k,
              data: Object.keys(data[k]).map(d => ({
                x: new Date(d),
                y: data[k][d]
              }))
            }))
        } else {
          return [{
            data: Object
              .keys(data)
              .map(name => ({
                name,
                y: data[name]
              }))
          }]
        }
      })
  }
}
