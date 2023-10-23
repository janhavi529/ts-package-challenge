# Package Challenge

## Introduction
You want to send your friend a package with different things. 
Each thing you put inside the package has such parameters as index number, weight and cost. The package has a weight limit. Your goal is to determine which things to put into the package so that the total weight is less than or equal to the package limit and the total cost is as large as possible.
You would prefer to send a package which weighs less in case there is more than one package with the same price.

## Input sample
Your API should accept as its first argument a path to a filename. The input file contains several lines. Each line is one test case. 
Each line contains the weight that the package can take (before the colon) and the list of items you need to choose. Each item is enclosed in parentheses where the 1st number is a item’s index number, the 2nd is its weight and the 3rd is its cost. E.g.

```txt
81 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76) (5,30.18,€9) (6,46.34,€48)
8 : (1,15.3,€34)
75 : (1,85.31,€29) (2,14.55,€74) (3,3.98,€16) (4,26.24,€55) (5,63.69,€52) (6,76.25,€75) (7,60.02,€74) (8,93.18,€35) (9,89.95,€78)
56 : (1,90.72,€13) (2,33.80,€40) (3,43.15,€10) (4,37.97,€16) (5,46.81,€36) (6,48.77,€79) (7,81.80,€45) (8,19.36,€79) (9,6.76,€64)
```

## Output sample
For each set of items that you put into a package provide a new row in the output string (items’ index numbers are separated by comma). E.g. 
```txt
4
-
2,7
8,9
```

### Constraints
1. Max weight that a package can take is ≤ 100
2. There might be up to 15 items you need to choose from
3. Max weight and cost of an item is ≤ 100
4. You should implement a ```class Packer``` with a static method named ```pack```. 
5. This method accepts a file path to a test file as a string. The test file will be in UTF-8 format. The pack method returns the solution as a ```string```.
6. Your method should throw an error named ```PackingError``` where relevant, if any constraints are not met. Therefore your signature in pseudocode should look like:

```ts
class Packer {
  async pack(filePath: string): Promise<string> {
    // ...
  }
}
```

7. Signatures of ```Packer``` class, ```pack()``` method and ```PackingError``` are already provided, please **do not change** them.

## Usage

A test GET API endpoint has been created which expects a file name input parameter and calls the packer utility (jt-packer-utility) to get the solution which determines the list of items to put into each package so that the total weight is less than or equal to the package limit and the total cost is as large as possible.

Route: ```GET /packages/:fileName```

Note: This is to provide ease of testing for various scenarios for the Packer utility and can be tested using Postman.

Example file name inputs (Note: These are all present in the 'resources' folder):
- input_valid.txt -> All package inputs in the correct format (happy path)
- input_invalid_package_weight.txt -> Not meeting the constraint where package max weight must be ≤ 100
- input_invalid_item_weight.txt -> Not meeting the constraint where item weight must be ≤ 100
- input_invalid_item_cost.txt -> Not meeting the constraint where item cost must be ≤ 100
- input_invalid_item_number.txt -> Not meeting the constraint where number of items must be ≤ 15
- input_invalid_item_format.txt -> Contains a different format for an item than the expected ```(3,3.98,€16)``` format. In this case, an error is not thrown for the file, valid item formats are processed to calculate the result.
- input_invalid_no_package_weight.txt -> Invalid package input line, which doesn't contain a maximum weight limit. In this case, it is assumed that no items can be placed into the package and '-' is returned.
- input_invalid_no_items.txt -> Invalid item input line, which doesn't contain a list of items to be selected. In this case, it is assumed that no items can be placed into the package and '-' is returned.

The API code is deployed on the Heroku hosting provider at: https://enigmatic-brook-49863-43d60eee055a.herokuapp.com/
GET requests must be in the following format (can be fired from Postman):
- GET https://enigmatic-brook-49863-43d60eee055a.herokuapp.com/input_valid.txt
- GET https://enigmatic-brook-49863-43d60eee055a.herokuapp.com/input_invalid_package_weight.txt
- GET https://enigmatic-brook-49863-43d60eee055a.herokuapp.com/input_invalid_item_weight.txt
- GET https://enigmatic-brook-49863-43d60eee055a.herokuapp.com/input_invalid_item_cost.txt
- GET https://enigmatic-brook-49863-43d60eee055a.herokuapp.com/input_invalid_item_number.txt
- GET https://enigmatic-brook-49863-43d60eee055a.herokuapp.com/input_invalid_item_format.txt
- GET https://enigmatic-brook-49863-43d60eee055a.herokuapp.com/input_invalid_no_package_weight.txt
- GET https://enigmatic-brook-49863-43d60eee055a.herokuapp.com/input_invalid_no_items.txt
