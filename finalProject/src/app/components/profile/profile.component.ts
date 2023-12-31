import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { subscribe } from 'diagnostics_channel';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User = new User();
  UserId: string = "";
  monthOrYear!: string;

  tierOne = false;
  tierTwo = false;
  tierThree = false;
  freeTier = true;
  firstName?: string;
  editProfileToggle = false;
  saveOrChange = false;
  editOrUpdate = false;
  disappear = false;
  classApplied = false;
  classAppliedTwo = false;
  onlyProfilePicture = true;

  userId!: number;
  classAppliedDeleteProfile = false;


  constructor(private userService: UserService, private router: Router, private actRoute: ActivatedRoute) { }

  // ngOnInit(): void {
  //   const userId = this.actRoute.snapshot.paramMap.get("id") ?? "";
  //   this.userService.getUser(userId).subscribe(user => {
  //     this.currentUser = user;
  //     console.log(user);
  //   });
  // }

  ngOnInit(): void {
    // this.loadUserProfile();
    // console.log('UserId:', this.UserId);
    this.fillProfile();


  }

  fillProfile() {

    const UserId = this.actRoute.snapshot.paramMap.get("id") ?? "";
    // console.log(UserId);

    this.userId = parseInt(UserId);

    this.userService.getUser(this.userId).subscribe(user => {
      this.currentUser = user;
      // console.log(this.currentUser);
      if (this.currentUser.tier === "Just Looking") {
        this.tierOne = true;
      }
      else if (this.currentUser.tier === "Motivated") {
        this.tierTwo = true;
      }
      else {
        this.tierThree = true;
      }
      if (this.currentUser.paymentFrequency === "monthly") {
        this.monthOrYear = "month";
      }
      else {
        // (this.currentUser.paymentFrequency === "yearly");
        this.monthOrYear = "year";
      }

      if (this.currentUser.tier === "Just Looking") {
        this.freeTier = true;
      }
      else {
        this.freeTier = false;
      }
      const displayName = this.currentUser.name;
      //  console.log(displayName);
      this.firstName = displayName?.split(' ').slice(0, 1).join(' ');

      //  console.log(firstName);
    });
  }

  // loadUserProfile() {
  //   const UserId = this.actRoute.snapshot.paramMap.get("id") ?? "";

  //   this.userService.getUser(UserId).subscribe(user => {
  //     this.currentUser = user;
  //     console.log(user);
  //   });
  // };

  editProfile() {
    this.userService.updateUser2(this.currentUser).subscribe(() => {
      this.fillProfile();
      // location.reload();
      // window.alert("Edited Profile Successfully");
      // this.router.navigate(['profile/', this.currentUser.userId]);
      // }, error => {
      //   console.log('Error: ', error)
      //   if (error.status === 401 || error.status === 403) {
      //     this.userService.logoutUser();
      //     this.router.navigate(['signin']);

      //   }
      // });
    });
  }

  toggleProfile() {
    this.saveOrChange = !this.saveOrChange;
    // this.classApplied = !this.classApplied;
    this.classAppliedTwo = !this.classAppliedTwo;
    this.editProfileToggle = !this.editProfileToggle;
    this.onlyProfilePicture = !this.onlyProfilePicture;
  }

  toggleEditProfile() {
    this.classApplied = !this.classApplied;
    this.saveOrChange = !this.saveOrChange;
    this.editOrUpdate = !this.editOrUpdate;
    // this.disappear = !this.disappear;
    this.editProfileToggle = !this.editProfileToggle;
  }

  toggleDelete(){
    this.classAppliedDeleteProfile = !this.classAppliedDeleteProfile;
    (document.getElementById('deleteProfile') as HTMLFieldSetElement).setAttribute('disabled','disabled');
  }

  // goodbye(){
  //   (document.getElementById('cancelSub') as HTMLButtonElement).innerText = "Goodbye"
  //   setTimeout(() => {
  //     this.deleteProfileUser();
  //     }, 2500);
  // }

  goodbye(){
      (document.getElementById('cancelSub') as HTMLButtonElement).innerText = "Goodbye"
      setTimeout(() => {
        (document.getElementById('cancelSub') as HTMLButtonElement).innerText = "Deleting Profile..."
        }, 1000);
        setTimeout(() => {
          this.deleteProfileUser();
          }, 2000);
      }
    

  deleteProfileUser(){
      this.userService.deleteUser(this.userId).subscribe(() => {
        this.router.navigate(['/home']);
        this.userService.logoutUser();
      });
    }
  

}


