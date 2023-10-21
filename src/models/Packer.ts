import path from "path";
import fs from "fs";
import readline from "readline";
import events from "events";

import appRootPath from "app-root-path";

import { PackingError } from "../lib/errors/PackingError";
import notFoundErrors from "../lib/errors/NotFoundErrors";

export class Packer {
  /**
   * Method to create maximum cost packages of items provided in the input file.
   *
   * @param {String} filePath relative or absolute file path
   * @throws {PackingError} if unable to pack
   * @returns {Promise<String>} solution
   */
  static async pack(filePath: string): Promise<string> {
    try {
      console.log("filePath inside Packer----->>>", filePath);

      // TODO: check if path is relative or absolute - contains 'mainDir'
      // For now, assuming the file exists in the 'resources' folder

      console.log("__dirname inside Packer----->>>", __dirname);
      console.log("appRootPath----->>>", appRootPath);

      const testFilePathArr = filePath.split("/");
      // Get absolute file path by joining the application's root path.
      const absolutePath = path.join(
        appRootPath.toString(),
        ...testFilePathArr
      );

      console.log("absolutePath----->>>", absolutePath);

      // Check if the file exists.
      if (!fs.existsSync(absolutePath)) {
        throw new notFoundErrors.FileNotFound("File does not exist");
      }

      // Use readline interface for reading data from the file stream one line at a time.
      // Instead of fs.readFileSync(), which loads the whole file first before reading any lines, hence consuming more memory.
      const rl = readline.createInterface({
        input: fs.createReadStream(absolutePath, { encoding: "utf-8" }),
        crlfDelay: Infinity, // Identify all instances of \r\n as a single newline.
      });

      const packages: Array<string> = [];

      // Process each line from the file.
      rl.on("line", (line) => {
        console.log(`Line from file: ${line}`);

        // TODO: Add checks/validations
        const weightLimitMatch = line.match(/(\d+) :/);
        console.log("weightLimitMatch---->>>", weightLimitMatch);
        const weightLimit = weightLimitMatch
          ? parseInt(weightLimitMatch[1])
          : 0;
        console.log("weightLimit---->>>", weightLimit);

        if (weightLimit > 100) {
          throw new PackingError(`Package weight ${weightLimit} exceeds 100`);
        }

        const itemRegex = /\(\d+,\d+\.\d+,\€\d+\)/g;
        const matchedItems = line.match(itemRegex);
        console.log("matchedItems---->>>", matchedItems);

        if (matchedItems && matchedItems.length) {
          const items = matchedItems.reduce((accum, itemStr) => {
            const itemStringMatch = itemStr.match(/(\d+),([\d.]+),\€(\d+)/);
            console.log("itemStringMatch---->>>", itemStringMatch);

            if (itemStringMatch && itemStringMatch.length) {
              const item = {
                index: parseInt(itemStringMatch[1]),
                weight: parseFloat(itemStringMatch[2]),
                cost: parseInt(itemStringMatch[3]),
              };

              if (item.weight > 100) {
                throw new PackingError(
                  `Item weight ${item.weight} (from package with weight limit ${weightLimit}) exceeds 100`
                );
              }

              if (item.cost > 100) {
                throw new PackingError(
                  `Item cost €${item.cost} (from package with weight limit ${weightLimit}) exceeds €100`
                );
              }

              accum.push(item);
            }

            return accum;
          }, [] as Array<{ index: number; weight: number; cost: number }>);

          if (items.length > 15) {
            throw new PackingError(
              `Number of items ${items.length} (from package with weight limit ${weightLimit}) exceeds 15`
            );
          }

          const packageItems = this.getPackageItems(weightLimit, items);

          console.log("packageItems---->>>", packageItems);

          // Form a 'packages' array with selected items in the required string format e.g. ['4', '-', '2,7', '8,9']
          if (packageItems.length) {
            packages.push(packageItems.join(","));
          } else {
            packages.push("-");
          }
        } else {
          packages.push("-");
        }
      });

      await events.once(rl, "close");

      console.log("File processed.");

      console.log("packages------->>>", packages);

      return Promise.resolve("solution");
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }

  static getPackageItems(
    weightLimit: number,
    items: Array<{ index: number; weight: number; cost: number }>
  ): Array<number> {
    const n = items.length;

    console.log("items--1-->>>", items);
    // Sort items by weight in ascending order to start calculating with lighter items.
    items.sort((a, b) => a.weight - b.weight);

    console.log("items--2-->>>", items);

    /* Using Dynamic Programming Approach
     * Memoization - To keep a track of previous maximum cost calculations and use cached results for further iterations.
     * This is better than using a recursive approach, which has very high exponential time complexity due to repetitive calculations.
     */

    //  Tabulation - Creating a 2D Array to keep track of the maximum cost for each combination of items.
    const trackedCosts = new Array(n + 1)
      .fill(0)
      .map(() => new Array(weightLimit + 1).fill(0));

    console.log("trackedCosts--1-->>>", trackedCosts);

    // For each item (row), loop through each column which contains weights from 0 to weightLimit and apply maximum cost calculation logic.
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= weightLimit; j++) {
        if (i === 0 || j === 0) {
          trackedCosts[i][j] = 0;
        } else if (items[i - 1].weight <= j) {
          // If the item weighs less than the weight 'j', we can make a choice whether to add the item to the package or not, based on the maximum cost calculation below.
          // Go to previous row which contains maximum costs till now. Get the cost for the previous item for remaining weight (subtracting item's weight from the allowed weight 'j').
          const previousMaximumCost =
            trackedCosts[i - 1][j - Math.floor(items[i - 1].weight)];
          console.log("previousMaximumCost------->>>", previousMaximumCost);
          const costIfIncluded = items[i - 1].cost + previousMaximumCost;
          console.log("costIfIncluded------->>>", costIfIncluded);

          // If the item is not included, get the maximum cost for the previous item row for the same weight 'j'.
          const costIfNotIncluded = trackedCosts[i - 1][j]; // Memoization
          console.log("costIfNotIncluded------->>>", costIfNotIncluded);

          trackedCosts[i][j] = Math.max(costIfIncluded, costIfNotIncluded);
        } else {
          // If the current item's weight is greater than the allowed weight 'j', it cannot be included. Set the previous maximum cost.
          trackedCosts[i][j] = trackedCosts[i - 1][j]; // Memoization
        }
      }
    }

    console.log("trackedCosts--2-->>>", trackedCosts);

    // Backtrack through the trackedCosts array to get selected items.
    const selectedItemIndices = [];
    let j = weightLimit;
    for (let i = n; i > 0 && j > 0; i--) {
      // Checking if the previous item's maximum cost is the same. If so, The current item is not the item which has contributed to the maximum cost, so move up to the previous row.
      if (trackedCosts[i][j] !== trackedCosts[i - 1][j]) {
        // Add the previous item index to the selected items.
        selectedItemIndices.push(items[i - 1].index);
        // Update the remaining weight.
        j -= Math.floor(items[i - 1].weight);
      }
    }

    console.log("selectedItemIndices---->>>", selectedItemIndices);

    // Sort the selected items indices array in ascending order as the output is expected in sorted format.
    return selectedItemIndices.sort((a, b) => a - b);
  }
}
