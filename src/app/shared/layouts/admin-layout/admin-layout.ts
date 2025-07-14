import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderAdmin } from '../../component/header-admin/header-admin';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, HeaderAdmin],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {

}
