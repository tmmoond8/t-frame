interface StackItem {
  id: number;
  screenName: string;
}

export class ScreenStack {
  private stack: StackItem[] = [];

  constructor() {
    this.stack = [
      {
        id: 0,
        screenName: window.location.pathname,
      },
    ];
  }

  get all() {
    return this.stack;
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

  push(screenName: string) {
    console.info("stack: push", screenName);
    return this.stack.push({
      id: this.size,
      screenName,
    });
  }

  pop() {
    console.info("stack: pop");
    return this.stack.pop() ?? null;
  }

  get screens() {
    return this.stack.map(({ screenName }) => screenName);
  }
}
