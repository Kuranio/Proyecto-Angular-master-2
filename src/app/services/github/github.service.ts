import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import options from 'src/token';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class GithubService {
  private username: string;
  private client_id = '5bb4e25b89af9bfedd26';
  private client_secret = 'aad8bea230843efcb296a23a98848cf8781979f7';

  constructor(private _http: HttpClient )  {
    this.username = 'Kuranio';
  }

  getUser(): Observable<any>  {
    return this._http.get('https://api.github.com/users/' + this.username, options)
      .pipe(map(res => res));
  }

  getRepos(): Observable<any> {
    return this._http.get<any[]>('https://api.github.com/users/' + this.username + '/repos', options)
      .pipe(
        map(res => res.map(repo => ({
          name: repo.name,
          description: repo.description,
          url: repo.html_url
        })))
      );
  }

  getUsername(): string {
    return this.username;
  }

  updateUser(username: string) {
    this.username = username;
  }
}
