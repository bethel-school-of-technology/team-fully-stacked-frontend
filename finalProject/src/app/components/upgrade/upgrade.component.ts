import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {


  userLoggedIn = true;
  showOrHide!: boolean;
  userId?: number;

  currentUser: User = new User;

  constructor(private router: Router, private userService: UserService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const UserId = this.actRoute.snapshot.paramMap.get("id") ?? "";
    this.userId = parseInt(UserId);
    this.userService.getUser(this.userId).subscribe(user => {
      this.currentUser = user;
      // this.currentUser.userId
    });
    // console.log(this.router.url);
    this.routeCheck();

    setTimeout(function(){
      location.reload();
  }, 10000);

  }

  routeCheck() {
    if (this.router.url.startsWith('/change-plan/')) {
      // console.log("Change-plan");
      this.showOrHide = true;
    }
    else {
      this.showOrHide = false;
    }
  }

 

}
