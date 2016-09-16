/*******************************
 * Functions used by base XBee
 * base_functions.cpp
 *
 * Boston University
 * EC544 Fall 2016 - Group 8
 * Andrew Delollis, Connor McCann, Eric Mooney, Luke Osborne
 *
 * Challenge 1
 */
#include "base_functions.hpp"
using namespace std;

double average_temp(const vector<double>& temps){
		double total_temp = 0;
		for(vector<double>::const_iterator it = temps.begin(); it != temps.end(); ++it){
				total_temp += (*it);
		}

		return total_temp / temps.size();
}
