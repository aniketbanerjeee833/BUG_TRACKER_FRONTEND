import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Bug, BugService } from '../../services/bugs-service';

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bugs.html',
  styleUrl: './bugs.css'
})
export class Bugs implements OnInit {
  bugs: Bug[] = [];
  loading = true;
  currentPage = 1;
  bugsPerPage = 5;

  constructor(private bugService: BugService, private router: Router) {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      console.log('User found in localStorage:', savedUser);
    }
  }

  ngOnInit(): void {
    this.fetchBugs();
  }

  fetchBugs() {
    this.loading = true;
    this.bugService.getAllBugs().subscribe({
      next: (res) => {
        this.bugs = res.bugs;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch bugs', err);
        this.loading = false;
      }
    });
  }

  get paginatedBugs(): Bug[] {
    const start = (this.currentPage - 1) * this.bugsPerPage;
    return this.bugs.slice(start, start + this.bugsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.bugs.length / this.bugsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
