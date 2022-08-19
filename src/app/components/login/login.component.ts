import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = new Login();

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.logout();
  }

  submit() {
    this.userService.login(this.login).subscribe(response => {
      this.router.navigate(['file-management']);
    })
  }
}
