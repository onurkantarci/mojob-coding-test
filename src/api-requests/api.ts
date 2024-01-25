import type { AxiosStatic } from 'axios'
import type { IPage, JobListing, PositionFunction } from '@/models/models'

export default class BaseApi {
  public axios!: AxiosStatic
  protected baseUrl: string

  constructor(url: string, axios: AxiosStatic) {
    this.baseUrl = url
    this.axios = axios
  }

  private pageSize: number = 5

  public updatePageSize = (pageSize: string): void => {
    if (pageSize === 'all') {
      this.pageSize = 100
    } else if (pageSize === '25') {
      this.pageSize = 25
    } else if (pageSize === '5') {
      this.pageSize = 5
    }
  }

  public getPositionFunctions = (): Promise<IPage<PositionFunction>> =>
    this.axios
      .get(`${this.baseUrl}job/position-functions/?page_size=100`)
      .then((response) => response.data)

  public getJobListings = (): Promise<IPage<JobListing>> =>
    this.axios
      .get(
        `${this.baseUrl}job/listings/?include_open=False&page=1&page_size=${this.pageSize}&use_mojob_feed_filter=True&use_pagination=True`
      )
      .then((response) => response.data)

  public getFilteredJobListings = (searchQuery: string): Promise<IPage<JobListing>> =>
    this.axios
      .get(`${this.baseUrl}job/position-functions/?search=${searchQuery}`)
      .then((response) => response.data)
}
