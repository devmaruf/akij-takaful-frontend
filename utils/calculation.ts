export const calculateBMI = (height: number, weight: number, age: number): { bmi: number, status: string } => {

  const heightInMeters = height / 100; // convert height to meters
  const bmi = weight / (heightInMeters * heightInMeters); // calculate BMI
  let status: string;

  if (age < 18) {
    status = 'Age must be greater than or equal to 18';
  } else if (bmi < 18.5) {
    status = 'Underweight';
  } else if (bmi < 25) {
    status = 'Normal';
  } else if (bmi < 30) {
    status = 'Overweight';
  } else {
    status = 'Obese';
  }

  return { bmi, status };
}


export const calculateAge = (birthDate: Date): number => {
  // if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
  //   throw new Error('Invalid birth date');
  // }

  const prevBirthdate = new Date(Date.parse(birthDate));
  const today: Date = new Date();
  let age: number = today.getFullYear() - prevBirthdate.getFullYear();
  const monthDifference: number = today.getMonth() - prevBirthdate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < prevBirthdate.getDate())) {
    age--; 
  }

  return age;
}
