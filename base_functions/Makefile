GCC = g++ -std=c++14


test: base_functions.o base_functions_test.o 
	${GCC} base_functions.o base_functions_test.o -o test

base_functions.o: base_functions.cpp
	${GCC} -c base_functions.cpp

base_functions_test.o: base_functions_test.cpp
	${GCC} -c base_functions_test.cpp
	
clean:
		rm base_functions.o base_functions_test.o test 
