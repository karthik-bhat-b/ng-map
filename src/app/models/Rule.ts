export type Root = RuleSet[]

export interface RuleSet {
  rules: Rule[]
  color: string
}

export interface Rule {
  attribute: string
  value: string
}

export interface TestRule {
    test1: string;
    test2: string
}