export type Subject = "Math" | "English" | "History";

export type LetterGrade =
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D"
  | "F";

export interface Student {
  name: string;
  grades: Record<Subject, number>;
}
