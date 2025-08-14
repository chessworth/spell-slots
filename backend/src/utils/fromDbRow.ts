// utils/fromDbRow.ts
function fromDbRow<T extends object>(row: any, ClassType: new (...args: any[]) => T, excludeKeys: (keyof T)[] = []): T {
    // Create a new instance of the class
    const instance = new ClassType();
    //test for keys
    Object.keys(instance).forEach((key) => {
        console.log(key);
    })
    // Copy only keys that exist on the class and are not excluded
    Object.keys(row).forEach((key) => {
        if (key in instance && !excludeKeys.includes(key as keyof T)) {
        (instance as any)[key] = row[key];
        }
    });

    return instance;
}

export = fromDbRow;
