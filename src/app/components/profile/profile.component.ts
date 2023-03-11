import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github/github.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  public user: any = [];
  public repos: any = [];
  public username: string = "bradtraversy"; // o inicializa la variable aquí

  constructor(private _githubService: GithubService) {}

  ngOnInit() {
    this._githubService.getUser().subscribe(user => {
      this.user = user;
    });

    this._githubService.getRepos().subscribe(repos => {
      this.repos = repos;
    });
    
    this.username = this._githubService.getUsername();
  }

  searchUser() {
    this._githubService.updateUser(this.username);
    this.ngOnInit(); // volver a cargar los datos
  }
}
