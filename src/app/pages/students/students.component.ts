import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { StudentService } from '../../core/services/student.service';
import { Student } from '../../models/student.model';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PaginatedResponse, SchoolService } from '../../core/services/school.service';
import { School } from '../../models/school.model';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './students.component.html',
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  schools: School[] = [];
  selectedStudent: Student | null = null;
  isEditing = false;
  searchTerm: string = '';
  filteredStudents: Student[] = [];

  currentPage = 1;
  pageSize = 10;
  totalItems = 0;

  Math = Math;

  constructor(
    private studentService: StudentService,
    private schoolService: SchoolService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadStudents();
      this.loadSchools();
    }
  }

  loadSchools() {
    this.schoolService.getAllNoPaging().subscribe((res) => {
      this.schools = res;
      this.cdr.detectChanges();
    });
  }

  loadStudents(page: number = this.currentPage) {
    this.studentService.getAll(page, this.pageSize).subscribe((res: PaginatedResponse<Student>) => {
      this.students = res.data;
      this.filteredStudents = [...this.students];
      this.totalItems = res.totalItems;
      this.currentPage = res.page;
      this.cdr.detectChanges();
    });
  }

  applyFilter() {
    const term = this.searchTerm.toLowerCase();
    this.filteredStudents = this.students.filter(
      (s) => s.name.toLowerCase().includes(term) || s.cpf.toLowerCase().includes(term),
    );
  }

  onSearchChange() {
    this.applyFilter();
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.totalItems) {
      this.loadStudents(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadStudents(this.currentPage - 1);
    }
  }

  newStudent() {
    this.isEditing = false;
    this.selectedStudent = {
      id: 0,
      name: '',
      birthDate: '',
      cpf: '',
      address: '',
      mobilePhone: '',
      schoolId: 0,
    };
  }

  editStudent(student: Student) {
    this.isEditing = true;
    this.selectedStudent = { ...student };
  }

  saveStudent() {
    if (!this.selectedStudent) return;

    if (this.isEditing) {
      this.studentService
        .update(this.selectedStudent.id, this.selectedStudent)
        .subscribe(() => this.loadStudents());
    } else {
      this.studentService.create(this.selectedStudent).subscribe(() => this.loadStudents());
    }

    this.selectedStudent = null;
  }

  deleteStudent(id: number) {
    this.studentService.delete(id).subscribe({
      next: () => this.loadStudents(),
    });
  }

  cancel() {
    this.selectedStudent = null;
  }

  getSchoolDescription(schoolId: number): string {
    const school = this.schools.find((s) => s.id === schoolId);
    return school ? school.description : '-';
  }
}
