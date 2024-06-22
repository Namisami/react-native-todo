import {describe, expect, test} from '@jest/globals';
import objectsEquality from '../utils/objectsEquality';


describe(`objectsEquality module`, () => {
  test(`{"a": 1} to {"a": 1} equality`, () => {
    expect(objectsEquality({"a": 1}, {"a": 1})).toBe(true);
  });
  test(`{"a": 1} to {"b": 1} equality`, () => {
    expect(objectsEquality({"a": 1}, {"b": 1})).toBe(false);
  });
  test(`{"a": 1, "b": 1} to {"b": 1} equality`, () => {
    expect(objectsEquality({"a": 1, "b": 1}, {"b": 1})).toBe(false);
  });
  test(`{"a": {"b": 1}} to {"a": {"b": 1}} equality`, () => {
    expect(objectsEquality({"a": {"b": 1}}, {"a": {"b": 1}})).toBe(true);
  });
  test(`{"a": {"b": 1}} to {"a": {"b": 2}} equality`, () => {
    expect(objectsEquality({"a": {"b": 1}}, {"a": {"b": 2}})).toBe(false);
  });
  test(`{"a": {"b": 1}} to {"a": {b: 1}} equality`, () => {
    expect(objectsEquality({"a": {"b": 1}}, {"a": {b: 1}})).toBe(true);
  });
  test(`{"a": {"b": {c: 1}}} to {"a": {"b": {c: 1}}} equality`, () => {
    expect(objectsEquality({"a": {"b": {c: 1}}}, {"a": {"b": {c: 1}}})).toBe(true);
  });
  test(`{"a": {"b": {"c": 1}}} to {"a": {"b": {c: 1}}} equality`, () => {
    expect(objectsEquality({"a": {"b": {"c": 1}}}, {"a": {"b": {c: 1}}})).toBe(true);
  });
  test(`{"a": {"b": {"c": 1}}} to {"a": {"b": {"c": 2}}} equality`, () => {
    expect(objectsEquality({"a": {"b": {"c": 1}}}, {"a": {"b": {"c": 2}}})).toBe(false);
  });
});
