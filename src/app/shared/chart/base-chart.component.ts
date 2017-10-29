import * as d3 from 'd3'
import { Area, Line } from 'd3-shape'
import { ScaleTime, ScaleLinear, ScaleBand } from 'd3-scale'
import { Selection, BaseType } from 'd3-selection'
import { AxisScale } from 'd3-axis'
import { Component, OnInit, Input, ViewChild, AfterViewInit, HostBinding, ElementRef, Injectable } from '@angular/core'
import { ReplaySubject } from 'rxjs/ReplaySubject'

import * as Chart from './chart'
import { BaseChartSerieView } from './base-chart-serie'

const duration = '300ms cubic-bezier(.35,0,.25,1)'
const defaultColors = ['#fff', '#47c153', '#ffdd47', '#f1434d', '#54c2e2', '#bf5cdc', '#ffae00', '#f14f81']

export interface BaseChartViewOptions {
  margin?: {
    left: Chart.SizeValue,
    right: Chart.SizeValue,
    top: Chart.SizeValue,
    bottom: Chart.SizeValue,
  },
  width: number,
  height: number,
  g?: Selection<BaseType, {}, null, undefined>
}

@Injectable()
export abstract class BaseChartComponent implements OnInit, AfterViewInit {
  @ViewChild('svg') svgRef: ElementRef
  @Input() set series(value: Chart.Serie[]) {
    value = value || []

    this.viewInit$.subscribe(() => this.updateSeries(value))
  }
  private _series: Chart.Serie[] = []
  get series() {
    return this._series
  }
  @Input() colors = defaultColors
  gradientRelative = false
  gradientStops = [
    {offset: '0%', opacity: '1'},
    {offset: '20%', opacity: '0.8'},
    {offset: '50%', opacity: '0.3'},
    {offset: '70%', opacity: '0'},
  ]
  viewInit$ = new ReplaySubject()
  area: Area<Chart.Point>
  line: Line<Chart.Point>
  serieViews: BaseChartSerieView[] = []
  svg: Selection<SVGElement, {}, null, undefined>
  legend: Selection<BaseType, {}, null, undefined>
  x: AxisScale<any>
  y: AxisScale<any>
  view: BaseChartViewOptions = {
    width: 0,
    height: 0,
    margin: {top: 10, right: '15%', bottom: 0, left: 0}
  }

  abstract addSerie(serie: Chart.Serie, color: string)
  abstract updateAxises()
  abstract update()

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

  initAnimation() {}

  ngAfterViewInit() {
    this.svg = d3.select(this.svgRef.nativeElement)
    this.view.g = this.svg.append('g')

    this.updateLayout()
    this.addLegend()
    this.addGradients()
    this.addClipPath()

    this.viewInit$.next(true)
  }

  updateSeries(series: Chart.Serie[]) {
    this._series = series
    this.update()

    if (!this.serieViews.length && series.length) {
      this.initAnimation()
    }

    this.serieViews
      .filter(v => !series.find(s => s.name === v.name))
      .forEach(v => this.removeSerie(v))

    series.slice().reverse().forEach((serie, i) => {
      const color = this.colors[series.length - i - 1]
      const view = this.serieViews.find(v => v.name === serie.name)
      if (view) {
        view.color = color
        view.update(serie)
      } else {
        this.addSerie(serie, color)
      }
    })
  }

  removeSerie(view: BaseChartSerieView) {
    this.serieViews = this.serieViews.filter(v => v !== view)
    view.destroy()
  }

  updateLayout() {
    const { offsetWidth, offsetHeight } = this.el.nativeElement
    const margin = this.view.margin

    this.view = {
      ...this.view,
      margin,
      width: offsetWidth - this.sizeX(margin.left) - this.sizeX(margin.right),
      height: offsetHeight - this.sizeY(margin.top) - this.sizeY(margin.bottom)
    }

    this.view.g.attr('transform', 'translate(' + this.sizeX(margin.left) + ',' + this.sizeY(margin.top) + ')')
  }

  size(value: Chart.SizeValue, containerSize: number): number {
    if (isNaN(+value)) {
      const parsed = (value as string).split('%')
      if (parsed.length === 2) {
        return containerSize * +parsed[0] / 100
      } else {
        return 0
      }
    } else {
      return +value
    }
  }

  sizeX(value: Chart.SizeValue) {
    return this.size(value, this.el.nativeElement.offsetWidth)
  }

  sizeY(value: Chart.SizeValue) {
    return this.size(value, this.el.nativeElement.offsetHeight)
  }

  addGradients() {
    const defs = this.svg.append('defs')
    let minY = this.view.margin.top
    let maxY = this.sizeY(this.view.margin.top) + this.view.height
    let gradientUnits = 'userSpaceOnUse'

    if (this.gradientRelative) {
      minY = 0
      maxY = 1
      gradientUnits = 'objectBoundingBox'
    }

    this.colors.forEach((color, index) => {
      defs.append('linearGradient')
        .attr('id', `gradient-${index}`)
        .attr('gradientUnits', gradientUnits)
        .attr('x1', 0).attr('y1', minY)
        .attr('x2', 0).attr('y2', maxY)
      .selectAll('stop')
        .data(this.gradientStops.map(s => ({...s, color})))
      .enter().append('stop')
        .attr('offset', d => d.offset)
        .attr('stop-color', d => d.color)
        .attr('stop-opacity', d => d['opacity'])
    })
  }

  renderAxises() {
    this.view.g.append('g')
      .attr('transform', 'translate(0,' + this.view.height + ')')
      .call(d3.axisBottom(this.x))

    this.view.g.append('g')
      .call(d3.axisLeft(this.y))
  }

  addLegend() {
    const { offsetWidth, offsetHeight } = this.el.nativeElement
    const legendWidth = this.sizeX(this.view.margin.right)

    const left = this.sizeX(this.view.margin.left) + this.size('15%', legendWidth)
    const top = this.sizeY(this.view.margin.top)

    this.legend = this.svg.append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(' + left + ',' + top + ')')
  }

  addClipPath() {
    this.view.g.append('clipPath')
      .attr('id', 'rectClip')
      .append('rect')
        .attr('width', 0)
        .attr('y', -4)
        .attr('height', this.view.height + 4)
  }
}
