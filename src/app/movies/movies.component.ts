import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie-service/movie.service';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  title = 'Movie List';
  movies!: Movie[];
  selectedMovie?: Movie;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => this.movies = movies);
  }

  onSelect(movie: Movie): void {
    console.log(movie);
    this.selectedMovie = movie;
  }

  addMovie(name: string, imageUrl: string, description: string): void {
    name = name.trim();
    imageUrl = imageUrl.trim();
    description = description.trim();
    if (!name || !imageUrl || !description) { return; }
    this.movieService.addMovie({ name, imageUrl, description } as Movie)
      .subscribe((movie: Movie) => {
        this.movies.push(movie);
      });
  }

  delete(movie: Movie): void {
    this.movies = this.movies.filter(m => m !== movie);
    this.movieService.deleteMovie(movie).subscribe();
  }

}
