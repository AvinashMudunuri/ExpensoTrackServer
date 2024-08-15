const types = [
  { name: 'Income', description: 'Earnings such as salary, interest, etc.' },
  {
    name: 'Expense',
    description: 'Expenses such as groceries, rent, utilities, etc.',
  },
  {
    name: 'Transfer',
    description: 'Transfers between accounts or to third parties.',
  },
  {
    name: 'Investment',
    description:
      'Money put into investment vehicles like stocks or mutual funds.',
  },
  { name: 'Loan Payment', description: 'Payments towards a loan or mortgage.' },
  {
    name: 'Utility Payment',
    description: 'Payments for utilities like electricity, water, etc.',
  },
  { name: 'Donation', description: 'Money donated to charities or causes.' },
  {
    name: 'Refund',
    description: 'Money returned for a previous purchase or payment.',
  },
];

const transactionTypes = types.map((c) => {
  return {
    ...c,
    label: c.name,
    value: c.name,
  };
});

module.exports = transactionTypes;
