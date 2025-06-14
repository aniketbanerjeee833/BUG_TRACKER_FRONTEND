// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class BugsService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bug {
  id: number;
  error_description: string;
  created_at: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class BugService {
  private apiUrl = 'http://localhost:5000/api/admin/bugs';

  constructor(private http: HttpClient) {}

  getAllBugs(): Observable<{ success: boolean, bugs: Bug[] }> {
    return this.http.get<{ success: boolean, bugs: Bug[] }>(this.apiUrl);
  }
}
