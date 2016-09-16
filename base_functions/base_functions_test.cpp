/*******************************
 * Functions used by base XBee
 * base_functions.test
 *
 * Boston University
 * EC544 Fall 2016 - Group 8
 * Andrew Delollis, Connor McCann, Eric Mooney, Luke Osborne
 *
 * Challenge 1
 */

#include <iostream>
#include <vector>
#include "base_functions.hpp"

using namespace std;

void check_expect(bool condition){
		static int test_number = 0;
		if(!condition)
				cout << "Test" << test_number << " Failed." << endl;
		else
				cout << "Test" << test_number << " Passed." << endl;

		test_number++;
}

int main()
{
		vector<double> temps1, temps2, temps3;

		// Test 1
		for(int i = 1; i < 101; i++){
				temps1.push_back((double)i);
		}
		check_expect(average_temp(temps1) == 50.5);
		
		// Test 2
		temps2.push_back(5.0);
		temps2.push_back(3.0);
		check_expect(average_temp(temps2) == (5.0 + 3.0)/2);

		// Test 3
		temps3.push_back(-1.6);
		temps3.push_back(-5.2);
		temps3.push_back(-10.5);
		check_expect(average_temp(temps3) == (-1.6 + -5.2 + -10.5)/3);

		return 0;
}


