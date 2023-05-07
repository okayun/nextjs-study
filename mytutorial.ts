/**
 * 型宣言 
 */
let var_string: string = 'hoge';
let var_number: number = 1;
let var_boolean: boolean = true;
let var_array_string: string[] = [ 'hoge', 'huga', 'piyo' ];
// Union型
let var_union: (number|string)[] = [ 'hoge', 1 ];
// タプル型
let var_tuple: [ number, string ] = [ 2, 'huga' ];
// オブジェクト型
// { プロパティ名1: 型, プロパティ名2: 型, ... }
let var_obj: { name: string, age: number } = {
  name: 'hoge',
  age: 20
};
// オブジェクト型(オプショナル)
let var_obj_optional: { name: string, age?: number } = {
  name: 'hoge'
  // age: 20 // なくてもエラーにならない
};
// 任意の型を許容する場合(基本的には使わない)
let var_any: any = 'hoge';
var_any = 123; // エラーにならない

/**
 * 関数
 */
function func1(arg1: number, arg2: string): number {
  console.log(`hello, ${arg2}`);
  return arg1;
}

// オプショナル
// func1WithOptional(123) -> ok
// func1WithOptional(123, 'hoge') -> ok
function func1WithOptional(arg1: number, arg2?: string): number {
  if (arg2 == undefined) {
    arg2 = 'default name';
  }
  console.log(`hello, ${arg2}`);
  return arg1;
}

// デフォルト引数
// func1WithDefault(123) -> ok
// func1WithDefault(123, 'hoge') -> ok
function func1WithDefault(arg1: number, arg2: string = 'default name'): number {
  console.log(`hello, ${arg2}`);
  return arg1;
}

// 関数を引数に受け取ることもできる
// function addMr(name: string): string { return `Mr.${name}`; }
// func1WithFunc('hoge', addMr) -> ok
function func1WithFunc(arg1: string, func: (name: string) => string): void {
  console.log(func(arg1));
}

// アロー関数
// (プロパティ名1: 型, プロパティ名2: 型, ...): 返り値の型 => 返り値
let arrowFunc = (name: string, age: number): string => `My name is ${name}. I'm ${age} years old.`;

/**
 * 型推論
 */
let var_auto = 1; // number型で入る
// console.log(var_auto.length); // number型なのでlengthを使おうとするとエラー

// アサーション
let var_assert: any = 'hoge';
let var_assert2 = var_assert as number; // 実行時にstringが入ってくるためエラーとなる

/**
 * 型エイリアス
 */
type Name = string;
// 独自の型も設定可能
type Point = {
  x: number;
  y: number;
}
// 関数の型も設定可能
type Formatter = (x: string) => string;
// プロパティ名が定まらない場合は以下のように指定可能（インデックス型というらしい）
// キー名やキーの数が定まらない場合に利用
type Label = {
  [key: string]: string;
};

function funcPoint(point: Point): void {
  console.log(`(x, y) = (${point.x}, ${point.y})`);
}

// これはプロパティ名が一致しないのでエラー
// funcPoint({ x: 100, z: 200 });

// Labelはインデックス型なのでたくさんプロパティを用意してもOK
let label: Label = {
  hoge: 'hoge',
  huga: 'huga',
  piyo: 'piyo'
};

/**
 * インターフェースとクラス
 */
// まずはxとyのみのインターフェースを定義
interface CoordinateParent {
  x: number;
  y: number;
}

// この時点ではzはない
function funcCoordinate(c: CoordinateParent): void {
  console.log(`(x, y, z) = (${c.x}, ${c.y}, ${c.z})`);
}

// zを追加して拡張(オプショナルで定義)
// こういうのはあまりやらないべき
interface CoordinateParent {
  z?: number;
}

// これで動く
funcCoordinate({ x: 1, y: 2, z: 3 });

// インターフェースを継承したクラスを定義
class CoordinateChild implements CoordinateParent {
  // xかyのいずれか一つ以上定義しない場合はコンパイルエラー
  // zはオプショナルなプロパティなので定義しなくてもok
  x: number;
  y: number;
}

// 複数のインターフェースを合わせて拡張することもできる
interface CoordinateColor {
  color: string;
}

// extendsでまとめて拡張
interface ExtendCoordinate extends CoordinateParent, CoordinateColor {}

// 以下のように呼び出し
let extendCoordinate: ExtendCoordinate = {
  x: 1,
  y: 2,
  color: 'red'
};

// 普通にクラスを定義
class Hoge {
  a: string;
  b: number;

  // コンストラクタ
  constructor(a: string = 'hoge', b: number = 1) {
    this.a = a;
    this.b = b;
  }

  // メソッド
  add(n: number): void {
    this.b += n;
  }

  set(s: string): void {
    this.a = s;
  }

  print(): void {
    console.log(`${this.a}, ${this.b}`);
  }
}

let hoge: Hoge = new Hoge();
hoge.add(1);
hoge.set('huga');
hoge.print();

// もちろんクラスからクラスへの継承もok
class Huga extends Hoge {
  a: string;
  b: number;
  c: number;

  constructor(a: string = 'hoge', b: number = 1, c: number = 2) {
    super(a, b);
    this.c = c;
  }

  sum(): number {
    return this.b + this.c;
  }
}

let huga: Huga = new Huga();
// 継承元メソッドを呼ぶこともできる
huga.add(2);
console.log(huga.sum());

// インターフェースを使ってメソッドの実装を強制することも可能
interface AbstractUser {
  name: string;
  age: number;

  // 引数なしで文字列を返すメソッドを継承先で定義させる
  sayHello: () => string;
}

class User implements AbstractUser {
  name: string;
  age: number;

  constructor(name: string = 'user', age: number = 20) {
    this.name = name;
    this.age = age;
  }

  sayHello(): string {
    return `My name is ${this.name}. I'm`;
  }
}

let user: User = new User('yamada', 21);
console.log(user.sayHello());

// クラスのプロパティやメソッドにはアクセス修飾子を設定できる
// 各修飾子は他の言語と同じような仕様
class Accessor {
  public a: string;
  private b: number;
  protected c: boolean;

  public print(): void {
    console.log(`${this.a}, ${this.b}, ${this.c}`)
  }

  private set(c: boolean): void {
    this.c = c;
  }

  protected resetB(): void {
    this.b = 0;
  }
}

/**
 * Enum型
 */
// 値を指定しない場合は0から順にインクリメントして設定されていく
enum EnumNumber {
  ZERO,
  ONE,
  TWO,
  THREE
}

// 文字列等を指定することも可能
enum EnumString {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

/**
 * ジェネリック
 * 型を抽象化して
 */
class Queue<T> {
  private array: T[];

  push(item: T) {
    this.array.push(item);
  }

  pop(): T | undefined {
    return this.array.shift();
  }
}

/**
 * Union型, Intersection型, リテラル型
 */
// Union型 いずれか一つの型に一致していればok
// Unionは和集合の意味
let var_union: number | string = 'union';
var_union = 1; // エラーにならない
// エイリアスを設定することもできる
type TypeUnion = number | string;

// Intersection型
// 複数の型をすべて包含した型を生成できる
type Profile = {
  name: string,
  age: number
};

type Contact = {
  email: string,
  address: string
};

type UserInfo = Profile & Contact;

let userInfo: UserInfo = {
  name: 'hoge',
  age: 20,
  email: 'hoge@hoge.co.jp',
  address: 'hoge県huga市piyo'
};
/*
// どちらかの型のプロパティだけだとエラー
userInfo = {
  name: 'hoge',
  age: 20
};*/

// リテラル型
// 特定の文字しか許容しないようにできる
let var_literal: 'hoge' | 'huga' = 'hoge';
// var_literal = 'piyo'; // これはエラー

// 特定の値しか返さない関数が定義できる
function funcLiteral(arg: number): 0 | 1 {
  let ret: number = arg % 2;
  return ret ? 1 : 0;
  // return 2; // エラー
  // return arg % 2; // なぜかこれもエラー
}

/**
 * never型
 * 必ず例外などを投げる(絶対に値を返さない)関数などに利用
 */
function funcError(message: string): never {
  throw new Error(message);
}

// こういう使い方ができる
function funcSwitch(arg: number): number {
  switch(arg) {
    case 1:
      return arg;
    case 2:
      return arg * 2;
    default:
      funcError('argument is incorrect.');
  }
}

/**
 * 非同期のAsync/Await
 * JSのPromiseの簡易構文に当たる
 */
// 非同期関数の定義
function fetchFromServer(id: string): Promise<{ success: boolean }> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true })
    }, 100)
  })
}

// 非同期処理を含むasync functionの返り値はPromise型になる
async function asyncFunc(): Promise<string> {
  const result = await fetchFromServer('111');
  return `The result: ${result.success}`;
}

// awaitを使うためにはasync functionの中で呼び出す必要がある
(async () => {
  const result = await asyncFunc();
  console.log(result)
})

// Promiseとして扱うには以下のように記述する
asyncFunc().then( result => console.log(result) );

/**
 * 他にも
 * - Optional Chaining
 * - readonly
 * - unknown
 * - Non Null Assertion Operator
 * - 型ガード
 * - keyof
 * - インデックス型
 * - 型定義ファイル
 * などがあるが、出てきた時に再度確認する
 */
