import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderUser } from "../../component/header-user/header-user";

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet,HeaderUser],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss'
})
export class UserLayout {

}
