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

