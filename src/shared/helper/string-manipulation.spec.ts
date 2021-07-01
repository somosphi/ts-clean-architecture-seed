import { expect } from 'chai';
import { removeAllWhiteSpacesAndConvertToLowerCase } from './string-manipulation';

describe('String Manipulation', () => {
  describe('#removeAllWhiteSpacesAndConvertToLowerCase', () => {
    it('should remove all white spaces and convert to lower case', () => {
      const result = removeAllWhiteSpacesAndConvertToLowerCase(
        'List Users Job'
      );

      const result2 = removeAllWhiteSpacesAndConvertToLowerCase(
        'list   Usersjob'
      );

      const result3 = removeAllWhiteSpacesAndConvertToLowerCase('listusersjob');

      const stringFormatted = 'listusersjob';
      expect(result)
        .to.be.eql(result2)
        .to.be.eql(result3)
        .to.be.eql(stringFormatted);
    });
  });
});
