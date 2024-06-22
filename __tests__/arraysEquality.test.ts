import {describe, expect, test} from '@jest/globals';
import arraysEquality from '../utils/arraysEquality';


describe(`arraysEquality module`, () => {
  test(`[1, 2, 3] to [1, 2, 3] equality`, () => {
    expect(arraysEquality([1, 2, 3], [1, 2, 3])).toBe(true);
  });
  test(`[1, 2, "3"] to [1, 2, 3] equality`, () => {
    expect(arraysEquality([1, 2, "3"], [1, 2, 3])).toBe(false);
  });
  test(`[1, 2] to [1, 2, 3] equality`, () => {
    expect(arraysEquality([1, 2], [1, 2, 3])).toBe(false);
  });
  test(`[{"a": 1}, {"b": 2}] to [{"a": 1}, {"b": 2}] equality`, () => {
    expect(arraysEquality([{"a": 1}, {"b": 2}], [{"a": 1}, {"b": 2}])).toBe(true);
  });
  test(`[{"a": 1}, {b: 2}] to [{"a": 1}, {"b": 2}] equality`, () => {
    expect(arraysEquality([{"a": 1}, {b: 2}], [{"a": 1}, {"b": 2}])).toBe(true);
  });
  test(`[{"a": 1}] to [{"a": 1}, {"b": 2}] equality`, () => {
    expect(arraysEquality([{"a": 1}], [{"a": 1}, {"b": 2}])).toBe(false);
  });
  test(`[{"a": {"b": 1}}] to [{"a": {"b": 1}}] equality`, () => {
    expect(arraysEquality([{"a": {"b": 1}}], [{"a": {"b": 1}}])).toBe(true);
  });
  test(`[{"a": {"b": 1, "c": 2}}] to [{"a": {"b": 1}}] equality`, () => {
    expect(arraysEquality([{"a": {"b": 1, "c": 2}}], [{"a": {"b": 1}}])).toBe(false);
  });
  test(`[{"a": {"b": {"c": 1}}}] to [{"a": {"b": {"c": 1}}}] equality`, () => {
    expect(arraysEquality([{"a": {"b": {"c": 1}}}], [{"a": {"b": {"c": 1}}}])).toBe(true);
  });
});
