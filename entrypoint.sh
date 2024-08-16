#!/bin/bash

if [[ "$1" == "java" ]]; then
    echo "Compiling and running Java code..."
    javac Main.java && java Main
elif [[ "$1" == "python" ]]; then
    echo "Running Python code..."
    python3 main.py
elif [[ "$1" == "cpp" ]]; then
    echo "Compiling and running C++ code..."
    g++ main.cpp -o main && ./main
else
    echo "Unsupported language"
fi
