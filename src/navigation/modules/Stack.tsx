interface StackItem {
  id: string;
  level: number;
  path: string;
  skipAnimation?: boolean;
}

const genID = () => (Math.random() * 123).toString(32).split(".")[1];
const STACK_SESSION_STORE = "STACK_SESSION_STORE";

export class ScreenStack {
  private stack: StackItem[] = [];
  private _trashs: Record<number, StackItem> = {};

  constructor() {
    const storedStack = JSON.parse(
      sessionStorage.getItem(STACK_SESSION_STORE) ?? "null"
    );
    if (storedStack) {
      this.stack = storedStack.stack;
      this._trashs = storedStack.trashs;
      return;
    }
    this.stack = [
      {
        id: genID(),
        level: 0,
        path: window.location.pathname,
        skipAnimation: false,
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

    const stack = this.stack.push({
      id: genID(),
      level: this.size,
      path,
    });
    sessionStorage.setItem(
      STACK_SESSION_STORE,
      JSON.stringify({
        stack: this.stack,
        trashs: this._trashs,
      })
    );

    return stack;
  }

  pop(options?: Partial<StackItem>) {
    console.info("stack: pop");
    const popped = this.stack.pop();
    this._trashs[this.size] = {
      ...popped!,
      ...options,
    };
    sessionStorage.setItem(
      STACK_SESSION_STORE,
      JSON.stringify({
        stack: this.stack,
        trashs: this._trashs,
      })
    );
    return popped ?? null;
  }

  get screens() {
    return this.stack.map(({ path }) => path);
  }
}
