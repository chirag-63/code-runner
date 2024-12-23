
const SampleCppCode =
`//Online C++ Compiler

#include<iostream>
using namespace std;

int main(){
    cout << "Hello, World!";
    return 0;
}`


const SamplePythonCode = 
`## this is a comment

print("Hello, World!")`



const SampleJavascriptCode = 
`//Online Javascript Compiler

console.log('Hello, World!')`



const SampleJavaCode =
`//Online Java Compiler

class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`


export const defaultCode = {
    cpp : SampleCppCode,
    python: SamplePythonCode,
    javascript: SampleJavascriptCode,
    java: SampleJavaCode
}
