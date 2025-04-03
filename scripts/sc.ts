function behavior() {
  return "hi";
}

class Cls {
  greet() {
    return "greet";
  }
}

type Combined = Cls & typeof behavior;

const N = Object.assign(behavior, Cls.prototype) as Combined;

N.greet = Object.create(Cls.prototype).greet;

console.log(N);
