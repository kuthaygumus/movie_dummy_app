import { Injectable } from '@angular/core';
import { Movies } from './movie.datasource';
import { Observable, of } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { LoggingService } from '../logging-service/logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiMoviesUrl = 'api/movies';

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) { }

  getMovies(): Observable<Movie[]> {
    this.loggingService.add('MovieService: fetched movies');
    return this.http.get<Movie[]>(this.apiMoviesUrl);
  }

  getMovie(id: number): Observable<Movie> {
    this.loggingService.add(`MovieService: fetched movie id=${id}`);
    return this.http.get<Movie>(`${this.apiMoviesUrl}/${id}`);
  }

  updateMovie(movie: Movie): Observable<any> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    };
    return this.http.put(this.apiMoviesUrl, movie, httpOptions);
  }

  addMovie(movie: Movie): Observable<Movie> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    };
    return this.http.post<Movie>(this.apiMoviesUrl, movie, httpOptions);
  }

  deleteMovie(movie: Movie | number): Observable<Movie> {
    const id = typeof movie === 'number' ? movie : movie.id;
    const url = `${this.apiMoviesUrl}/${id}`;
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' }
    };
    return this.http.delete<Movie>(url, httpOptions);
  }

}
