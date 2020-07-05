import { camelCase, upperCase, startCase } from 'lodash';

export default class StringUtility {
  public static toCamelCase(str: string): string {
    return camelCase(str);
  }

  public static toTitleCase(str: string): string {
    return startCase(camelCase(str));
  }

  public static toPascalCase(str: string): string {
    return startCase(camelCase(str)).replace(/ /g, '');
  }

  public static toConstantCase(str: string): string {
    return upperCase(str).replace(/ /g, '_');
  }

  /**
   * Positive Lookahead - Assert that the regex can be matched
   * Matches any character (except newline)
   * Case insensitive match.
   */
  public static createSearchRegex(value: string): RegExp {
    // Split all words into an array.
    let regex: any = value.split(' ');
    // Then remove all empty values caused by multiple spaces between words.
    regex = regex.filter(Boolean);
    // Then wrap all word between '(?=^.*' and ')'.
    regex = regex.map((word: string) => `(?=^.*${word})`);
    // Then join the array to make the string.
    regex = regex.join('');

    return new RegExp(regex, 'i');
  }
}
