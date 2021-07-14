import { Component, OnInit } from '@angular/core';
import { ITask } from '../../Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: ITask[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  deleteTask(task: ITask) {
    this.taskService.deleteTask(task).subscribe(() => this.tasks = this.tasks.filter(t => t.id != task.id));
  }

  toggleReminder(task: ITask) {
    task.reminder = !task.reminder;
    this.taskService.toggleReminder(task).subscribe();
  }

  addTask(task: ITask) {
    this.taskService.insertTask(task).subscribe((task) => this.tasks.push(task));
  }

}
