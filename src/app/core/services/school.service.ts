import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { School } from '../../models/school.model';

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalItems: number;
}

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  private apiUrl = 'https://localhost:7195/api/schools';

  constructor(private http: HttpClient) {}

  getAll(page: number = 1, pageSize: number = 10): Observable<PaginatedResponse<School>> {
    return this.http.get<PaginatedResponse<School>>(
      `${this.apiUrl}?page=${page}&pageSize=${pageSize}`,
    );
  }

  getAllNoPaging(): Observable<School[]> {
    return this.http.get<School[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<School> {
    return this.http.get<School>(`${this.apiUrl}/${id}`);
  }

  create(school: School): Observable<School> {
    return this.http.post<School>(this.apiUrl, school);
  }

  update(id: number, school: School): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, school);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
