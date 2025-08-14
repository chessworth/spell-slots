// models/Task.ts
export = class Task {
  id?: number | undefined = undefined;
  title: string = '';
  level: string = '';
  created_at?: Date;

  constructor(title?: string, level?: string, id?: number) {
    if (title) this.title = title;
    if (level) this.level = level;
    if (id) this.id = id;
  }
}
