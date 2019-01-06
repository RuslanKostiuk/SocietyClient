import {Injectable, NgModule} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import Event from "../models/Event";
import {environment} from "../../environments/environment";

@Injectable()
export class EventService {

  constructor(
    public http: HttpClient
  ) { }

  public get(id: string): Observable<any> {
    return this.http.get(`${environment.api}/event/:id`, {params: {id: id}});
  }

  public save(event: Event): Observable<any> {
    return this.http.post(`${environment.api}/event/save`, event);
  }

  public udpate(event: Event): Observable<any> {
    return this.http.post(`${environment.api}/event/update`, event);
  }

  public getMany(filters: any, limit: string, offset: string): Observable<any> {
    Object.assign(filters, {limit: limit, offset: offset});
    return this.http.get(`${environment.api}/event/getMany`, {params: filters});
  }
}

export function EventFactory(http: HttpClient) {
  return new EventService(http);
}

@NgModule({
  providers: [{
    provide: EventService,
    useFactory: EventFactory,
    deps: [HttpClient]
  }]
})
export class EventModule {}
