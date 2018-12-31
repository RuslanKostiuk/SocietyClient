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

  public getMany(limit: string, offset: string): Observable<any> {
    return this.http.get(`${environment.api}/event/getMany`, {params: {
      limit,
      offset
    }});
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
