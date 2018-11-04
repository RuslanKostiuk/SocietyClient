export function objectToArray(obj: any, isWithProperties?: boolean): any[] {
  const array: any[] = [];

  for (const key in obj) {
    if (!!isWithProperties) {
      array.push({key: obj[key]});
    } else {
      array.push(obj[key]);
    }
  }

  return array;
}

export function validateEmail(email: string): boolean {
  const pattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return pattern.test(email);
}
