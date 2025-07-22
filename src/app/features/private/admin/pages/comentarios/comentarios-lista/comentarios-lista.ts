import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComentarioService } from '../../../../../../core/services/comentario.service';
import { ComentarioI } from '../../../../../../core/models/comentario';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comentarios-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './comentarios-lista.html',
  styleUrl: './comentarios-lista.scss'
})
export class ComentariosList implements OnInit {
  private comentarioService = inject(ComentarioService);

  protected comentarios$!: Observable<ComentarioI[]>;

  ngOnInit(): void {
    this.getComentarios();
  }

  getComentarios(): void {
    this.comentarios$ = this.comentarioService.getComentarios();
  }

  eliminarComentario(id: number): void {
    this.comentarioService.deleteComentario(id).subscribe(() => {
      this.getComentarios();
    });
  }

  trackById(index: number, item: ComentarioI): number {
    return item.id ?? index;
  }
}
