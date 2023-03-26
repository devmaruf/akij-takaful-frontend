import React from 'react';
import { useRouter } from "next/router";
import ExpenseForm from "@/components/expense/ExpenseForm";

export default function ExpenseEdit() {
  const router = useRouter()
  const { id } = router.query;
  return (
    <ExpenseForm
      expenseID={id}
      pageType="edit"
    />
  )
}
