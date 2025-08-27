import React from 'react';

interface SwitchCasesProps<T extends string | number> {
  value: T;
  cases: Record<T, React.ReactElement>;
  defaultCase?: React.ReactElement;
}

function SwitchCases<T extends string | number>({
  value,
  cases,
  defaultCase,
}: SwitchCasesProps<T>) {
  return cases[value] ?? defaultCase ?? null;
}

export default SwitchCases;
