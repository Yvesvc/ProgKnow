import { apiEndpoint } from './appsettings';

export class HttpRequest<T> {
  private _url: string;

  constructor(url: string) {
    this._url = url;
  }

  public async SendAsync(): Promise<HttpResponse<T>> {
    let response: Response = await fetch(apiEndpoint + this._url);

    if (response.ok) {
      let bod: T = (await response.json()) as T;
      return new HttpResponse(response.ok, bod);
    } else {
      return new HttpResponse(response.ok);
    }
  }
}

export class HttpResponse<T> {
  public ok: boolean;
  public body?: T;

  constructor(ok: boolean, body?: T) {
    this.ok = ok;
    this.body = body;
  }
}
