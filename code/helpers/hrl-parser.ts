export function parseHRL<S>(text: string): S {
  const data: any = {};
  const sectionHeaderRegex = /^(#(?:[a-z]|[A-Z]|[0-9]|[;.-])*#)(.*)?/gim;
  let result: any[] | null = [];
  // tslint:disable:no-conditional-assignment
  while ((result = sectionHeaderRegex.exec(text)) !== null) {
    // create section in data
    const sectionKey: string = result[1].split(";")[0].replace(/#/g, "");
    const sectionTitles = result[2].split("#");
    const sectionValues: string[][] = getSectionValues(sectionKey, text);
    if (sectionValues.length > 1) {
      // it's an array of objects
      data[sectionKey] = [];
      for (const item of sectionValues) {
        data[sectionKey].push(pairTitleVal(item, sectionTitles));
      }
    } else if (sectionValues.length === 1) {
      // it's an object
      data[sectionKey] = pairTitleVal(sectionValues[0], sectionTitles);
    }
  }
  return data;
}

function getSectionValues(key: string, text: string): string[][] {
  const values = [];
  const regexStr = "^(?:" + key + "#{1})(.*)?";
  const valueRegex = new RegExp(regexStr, "gim");
  let result: any[] | null = [];
  while ((result = valueRegex.exec(text)) !== null) {
    values.push(result[1].split("#"));
  }
  return values;
}

function pairTitleVal(itemVals: any[], sectionTitles: string[]): { [key: string]: string } {
  const obj: { [key: string]: any } = {};
  sectionTitles.forEach((title: string, index: number) => {
    obj[title] = itemVals[index];
  });
  return obj;
}
