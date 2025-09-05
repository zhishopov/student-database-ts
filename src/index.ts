import promptSync from "prompt-sync";
import type { LetterGrade, Student, Subject } from "./types.js";

const prompt = promptSync();

const students: Student[] = [];

function createStudent(
  name: string,
  english: number,
  math: number,
  history: number
): Student {
  return { name, grades: { English: english, Math: math, History: history } };
}

function addStudent(student: Student): void {
  students.push(student);
}

function getStudentByName(name: string): Student | undefined {
  return students.find((student) => student.name === name);
}

function getAllStudentNames(): string[] {
  return students.map((student) => student.name);
}

function gradeToLetter(percent: number): LetterGrade {
  if (percent >= 93) return "A";
  if (percent >= 90) return "A-";
  if (percent >= 87) return "B+";
  if (percent >= 83) return "B";
  if (percent >= 80) return "B-";
  if (percent >= 77) return "C+";
  if (percent >= 73) return "C";
  if (percent >= 70) return "C-";
  if (percent >= 60) return "D";
  return "F";
}

const GPA_MAP: Record<LetterGrade, number> = {
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  D: 1.0,
  F: 0.0,
};

function letterToGpa(letter: LetterGrade): number {
  return GPA_MAP[letter];
}

function averagePercent(student: Student): number {
  const values = Object.values(student.grades);
  const gradesSum = values.reduce(
    (prevGrade, currentGrade) => prevGrade + currentGrade,
    0
  );
  const finalAverage = gradesSum / values.length;

  return finalAverage;
}

function averageGpa(student: Student): number {
  const letters = (Object.values(student.grades) as number[]).map(
    gradeToLetter
  );
  const gpas = letters.map(letterToGpa);
  const gpaSum = gpas.reduce((prevGpa, currentGpa) => prevGpa + currentGpa, 0);
  const average = gpaSum / gpas.length;

  return average;
}

function addStudentHandler(): void {
  console.log("Add Student:");

  const name = prompt("Enter Student Name: ");
  if (name.length === 0) {
    console.log("Name cannot be empty.");
    return;
  }

  const englishInput = prompt("English %: ");
  const english = Number(englishInput);

  if (isNaN(english) || english < 0 || english > 100) {
    console.log("English grade must be a number between 0 and 100.");
    return;
  }

  const mathInput = prompt("Math %: ");
  const math = Number(mathInput);

  if (isNaN(math) || math < 0 || math > 100) {
    console.log("Math grade must be a number between 0 and 100.");
    return;
  }

  const historyInput = prompt("History %: ");
  const history = Number(historyInput);

  if (isNaN(history) || history < 0 || history > 100) {
    console.log("History grade must be a number between 0 and 100.");
    return;
  }

  const student = createStudent(name, english, math, history);
  addStudent(student);
  console.log("Student created!");
}

function viewReport(): void {
  console.log("View Report:");

  const name = prompt("Enter Student Name: ");
  if (name.length === 0) {
    console.log("Name cannot be empty.");
    return;
  }

  const student = getStudentByName(name);
  if (!student) {
    console.log("Student not found!");
    return;
  }

  const records: { subject: Subject; percent: number; letter: LetterGrade }[] =
    [];

  for (const [subject, percent] of Object.entries(student.grades) as [
    Subject,
    number
  ][]) {
    records.push({ subject, percent, letter: gradeToLetter(percent) });
  }

  console.log(`Report for ${student.name}:`);
  for (const record of records) {
    const subj = record.subject;
    console.log(`${subj}: ${record.percent.toFixed(2)}% (${record.letter})`);
  }

  const averagePercentage = averagePercent(student);
  const avrgGpa = averageGpa(student);
  console.log(
    `Average: ${averagePercentage.toFixed(2)}% GPA: ${avrgGpa.toFixed(2)}`
  );
}

function listAllStudents(): void {
  console.log("All Students:");

  const names = getAllStudentNames();
  if (names.length === 0) {
    console.log("No students.");
    return;
  }
  names.forEach((studentName, index) =>
    console.log(`${index + 1}. ${studentName}`)
  );
}

function start(): void {
  while (true) {
    console.log("Student Database");
    console.log("1. Add student");
    console.log("2. View report");
    console.log("3. List students");
    console.log("4. Exit");

    const choice = prompt("Enter your choice (1-4): ");

    if (choice === "1") {
      addStudentHandler();
    } else if (choice === "2") {
      viewReport();
    } else if (choice === "3") {
      listAllStudents();
    } else if (choice === "4") {
      console.log("Goodbye!");
      break;
    } else {
      console.log("Invalid choice. Please enter 1, 2, 3, or 4.");
    }

    prompt("Press Enter to continue");
  }
}

start();
