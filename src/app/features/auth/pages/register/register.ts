import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { forbiddenNumbersValidator, forbiddenSpecialCharsValidator } from '../../../../core/validatores/Validador';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  user: Usuario ={
    usuario: '',
    correo: '',
    contrasenia: ''
  }

  formRegister = new FormGroup({
    usuario: new FormControl(this.user.usuario, [
      Validators.required,
      forbiddenNumbersValidator(),
      forbiddenSpecialCharsValidator()
    ]),
    correo: new FormControl(this.user.correo, [
      Validators.required,
      Validators.email
    ]),
    contrasenia: new FormControl(this.user.contrasenia, [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  get usuario() {
    return this.formRegister.get('usuario')
  };

  get correo() {
    return this.formRegister.get('correo')
  };

  get contrasenia() {
    return this.formRegister.get('contrasenia')
  }
}
