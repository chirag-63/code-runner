const SampleCppCode = `//Online C++ Compiler

#include<iostream>
using namespace std;

int main(){
    cout << "Hello, World!";
    return 0;
}`;

const SamplePythonCode = `## this is a comment

print("Hello, World!")`;

const SampleJavascriptCode = `//Online Javascript Compiler

console.log('Hello, World!')`;

const SampleJavaCode = `//Online Java Compiler

class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

export const defaultFile = {
    cpp: {
        fileName: 'main',
        extension: '.cpp',
        content: SampleCppCode,
        isMain: true,
    },
    java: {
        fileName: 'main',
        extension: '.java',
        content: SampleJavaCode,
        isMain: true,
    },
    python: {
        fileName: 'main',
        extension: '.py',
        content: SamplePythonCode,
        isMain: true,
    },
    javascript: {
        fileName: 'main',
        extension: '.js',
        content: SampleJavascriptCode,
        isMain: true,
    },
};

export const LANGUAGE_VERSIONS = {
    cpp: '10.2.0',
    java: '15.0.2',
    python: '3.10.0',
    javascript: '18.15.0',
};
