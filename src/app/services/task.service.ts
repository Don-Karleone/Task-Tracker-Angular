import { Injectable } from '@angular/core';
import { ITask } from '../Task';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl)
  }
  deleteTask(task: ITask): Observable<ITask> {
    const url: string = `${this.apiUrl}/${task.id}`;
    return this.http.delete<ITask>(url);
  }
  toggleReminder(task:ITask): Observable<ITask>{
    const url: string = `${this.apiUrl}/${task.id}`;
    return this.http.put<ITask>(url, task, httpOptions);
  }
  insertTask(task:ITask):Observable<ITask>{
    return this.http.post<ITask>(this.apiUrl, task, httpOptions);
  }
}
