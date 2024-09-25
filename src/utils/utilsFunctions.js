function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true; // Check for direct equality
  
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
      return false; // If either is not an object or null, they are not equal
    }
  
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) return false; // Different number of keys
  
    // Compare the values of each key in both objects
    for (let key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
  
    return true;
}
  
export function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false; // Different lengths
  
    for (let i = 0; i < arr1.length; i++) {
      if (!deepEqual(arr1[i], arr2[i])) return false; // Compare each object in the array
    }
  
    return true;
}

export function differenceFirstArrayObjects(arr1, arr2) {
    return arr1.filter(item1 => !arr2.some(item2 => deepEqual(item1, item2)));
}