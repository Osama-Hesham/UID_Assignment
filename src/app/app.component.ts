import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('Model') model: ElementRef | undefined;
  task: Task = new Task();
  TaskList: Task[] = [];

  ngOnInit(): void {
    const data = localStorage.getItem('mylocal');
    if (data != null) {
      this.TaskList = JSON.parse(data);
    }
  }

  openModel() {
    const model = document.getElementById('Model');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    this.task = new Task();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  SaveTask() {
    const LocalStorage = localStorage.getItem('mylocal');
    if (LocalStorage != null) {
      const items = JSON.parse(LocalStorage);
      this.task.id = items.length + 1;
      items.push(this.task);
      this.TaskList = items;
      localStorage.setItem('mylocal', JSON.stringify(items));
    } else {
      const newItems = [];
      newItems.push(this.task);
      this.task.id = 1;
      this.TaskList = newItems;
      localStorage.setItem('mylocal', JSON.stringify(newItems));
    }
    this.closeModel();
  }

  UpdateTask() {
    const item = this.TaskList.find(
      (m) => m.id === this.task.id
    );
    if (item != undefined) {
      item.name = this.task.name;
      item.description = this.task.description;
      item.date = this.task.date;
    }
    localStorage.setItem('mylocal', JSON.stringify(this.TaskList));
    this.closeModel();
  }

  EditTasks(item: Task) {
    this.task = item;
    this.openModel();
  }

  DeleteTasks(item: Task) {
    const DeleteTask = confirm('Do you want to delete this task?');
    if (DeleteTask) {
      const item = this.TaskList.findIndex(
        (m) => m.id === this.task.id
      );
      this.TaskList.splice(item, 1);
      localStorage.setItem('mylocal', JSON.stringify(this.TaskList));
    }
  }
}

export class Task {
  id: number;
  name: string;
  description: string;
  date: Date; 

  constructor() {
    this.id = 0;
    this.name = '';
    this.description = '';
    this.date = new Date(); 
  }
}
