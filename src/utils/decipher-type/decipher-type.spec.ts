import { decipherType } from './index';

describe('Decipher Type', () => {
  it('should return string', () => {
    expect(decipherType('Hello World')).toBe('string');
  });
  it('should return number', () => {
    expect(decipherType(899)).toBe('number');
  });
  it('should return boolean', () => {
    expect(decipherType(false)).toBe('boolean');
  });
  it('should return array', () => {
    expect(decipherType(['Hello World'])).toBe('array');
  });
  it('should return object', () => {
    expect(decipherType({ greet: 'Hello world' })).toBe('object');
  });
  it('should return date', () => {
    expect(decipherType(new Date())).toBe('date');
  });
  it('should return regex', () => {
    expect(decipherType(/Name/i)).toBe('regex');
  });
  it('should return symbol', () => {
    expect(decipherType(Symbol('name'))).toEqual('symbol');
  });
  it('should return function', () => {
    expect(decipherType(() => null)).toBe('function');
  });
  it('should return null', () => {
    expect(decipherType(null)).toBe('null');
  });
  it('should return undefined', () => {
    expect(decipherType(undefined)).toBe('undefined');
  });
});
