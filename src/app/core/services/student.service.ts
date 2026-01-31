import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  totalItems: number;
}

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'https://localhost:7195/api/students';

  constructor(private http: HttpClient) {}

  getAll(page: number = 1, pageSize: number = 10): Observable<PaginatedResponse<Student>> {
    return this.http.get<PaginatedResponse<Student>>(
      `${this.apiUrl}?page=${page}&pageSize=${pageSize}`,
    );
  }

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  update(id: number, student: Student) {
    return this.http.put(`${this.apiUrl}/${id}`, student);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
