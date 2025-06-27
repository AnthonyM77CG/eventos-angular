import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  
  user: Usuario = {
    usuario: '',
    correo: '',
    contrasenia: ''
  }

  formLogin = new FormGroup({
    correo: new FormControl(this.user.correo, [
      Validators.required
    ]),
    contrasenia: new FormControl(this.user.contrasenia, [
      Validators.required
    ])
  })

  get correo(){
    return this.formLogin.get('correo')
  }

  get contrasenia(){
    return this.formLogin.get('contrasenia')
  }
}
