import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie-service/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  @Input()
  movie?: Movie;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }

  updateMovie(): void {
    if (this.movie) {
      this.movieService.updateMovie(this.movie)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    window.history.back();
  }

}
