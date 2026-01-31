import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatedResponse, SchoolService } from '../../core/services/school.service';
import { School } from '../../models/school.model';

@Component({
  selector: 'app-schools',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schools.component.html',
})
export class SchoolsComponent implements OnInit {
  schools: School[] = [];
  filteredSchools: School[] = [];
  selectedSchool: School | null = null;
  isEditing = false;
  search = '';

  currentPage = 1;
  pageSize = 10;
  totalItems = 0;

  Math = Math;

  constructor(
    private schoolService: SchoolService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadSchools();
    }
  }

  loadSchools(page: number = this.currentPage) {
    this.schoolService.getAll(page, this.pageSize).subscribe((res: PaginatedResponse<School>) => {
      this.schools = res.data;
      this.filteredSchools = [...this.schools];
      this.totalItems = res.totalItems;
      this.currentPage = res.page;
      this.cdr.detectChanges();
    });
  }

  filter() {
    const term = this.search.toLowerCase();
    this.filteredSchools = this.schools.filter((s) => s.description.toLowerCase().includes(term));
  }

  newSchool() {
    this.isEditing = false;
    this.selectedSchool = { id: 0, description: '' };
  }

  editSchool(school: School) {
    this.isEditing = true;
    this.selectedSchool = { ...school };
  }

  saveSchool() {
    if (!this.selectedSchool) return;

    if (this.isEditing) {
      this.schoolService.update(this.selectedSchool.id, this.selectedSchool).subscribe({
        next: () => {
          this.loadSchools();
          this.selectedSchool = null;
        },
        error: (err) => console.error(err),
      });
    } else {
      this.schoolService.create(this.selectedSchool).subscribe({
        next: () => {
          this.loadSchools();
          this.selectedSchool = null;
        },
        error: (err) => console.error(err),
      });
    }
  }

  deleteSchool(id: number) {
    this.schoolService.delete(id).subscribe(() => this.loadSchools());
  }

  cancel() {
    this.selectedSchool = null;
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.totalItems) this.loadSchools(this.currentPage + 1);
  }

  prevPage() {
    if (this.currentPage > 1) this.loadSchools(this.currentPage - 1);
  }
}
