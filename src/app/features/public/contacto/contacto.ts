import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { forbiddenNumbersValidator, forbiddenSpecialCharsValidator } from '../../../core/validatores/Validador';
import { ComentarioService } from '../../../core/services/comentario.service';
import { ComentarioI } from '../../../core/models/comentario';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss'
})
export class Contacto {

  private comentarioService = inject(ComentarioService);

  contacto: ComentarioI = {
    nombre: "",
    correo: "",
    mensaje: "",
  };

  formContacto: FormGroup = new FormGroup({
    nombre: new FormControl(this.contacto.nombre, [
      Validators.required,
      forbiddenNumbersValidator(),
      forbiddenSpecialCharsValidator()
    ]),
    correo: new FormControl(this.contacto.correo, [
      Validators.required,
      Validators.email
    ]),
    mensaje: new FormControl(this.contacto.mensaje, [
      Validators.maxLength(200)
    ])
  });

  get nombre() {
    return this.formContacto.get('nombre');
  }

  get correo() {
    return this.formContacto.get('correo');
  }

  get mensaje() {
    return this.formContacto.get('mensaje');
  }

  enviarComentario(): void {
    if (this.formContacto.invalid) return;

    const nuevoComentario: ComentarioI = this.formContacto.value;

    this.comentarioService.crearComentario(nuevoComentario).subscribe({
      next: () => {
        alert('Comentario enviado con éxito');
        this.formContacto.reset();
      },
      error: () => {
        alert('Error al enviar el comentario');
      }
    });
  }
}
