interface StackItem {
  id: string;
  level: number;
  path: string;
}

const genID = () => (Math.random() * 123).toString(32).split(".")[1];

export class ScreenStack {
  private stack: StackItem[] = [];
  private _trashs: Record<number, StackItem> = {};

  constructor() {
    this.stack = [
      {
        id: genID(),
        level: 0,
        path: window.location.pathname,
      },
    ];
  }

  get all() {
    return this.stack;
  }

  get trashs() {
    return Object.values(this._trashs);
  }

  get prev() {
    return this.size > 1 ? this.stack[Math.max(0, this.size - 2)] : null;
  }

  get current() {
    return this.stack[Math.max(0, this.size - 1)];
  }

  get size() {
    return this.stack.length;
  }

  push(path: string) {
    console.info("stack: push", path);
    return this.stack.push({
      id: genID(),
      level: this.size,
      path,
    });
  }

  pop() {
    console.info("stack: pop");
    const popped = this.stack.pop();
    this._trashs[this.size] = popped!;
    return popped ?? null;
  }

  get screens() {
    return this.stack.map(({ path }) => path);
  }
}
