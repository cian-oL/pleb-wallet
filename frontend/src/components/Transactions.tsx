const Transactions = () => {
  type Transaction = {
    checking_id: number;
    amount: number;
    time: number;
    bolt11: string;
  };

  //   hard-coded data placeholder
  const transactions: Transaction[] = [
    {
      checking_id: 1,
      amount: 1000,
      time: 1669064951,
      bolt11: "lnbc20n1p3h24fhsp590ccjwy...",
    },
    {
      checking_id: 2,
      amount: 2000,
      time: 1668035952,
      bolt11: "lnbc980n1p3h24fhsp5cpcjdw...",
    },
  ];

  const formatDate = (txn: Transaction): string => {
    return new Date(txn.time * 1000).toLocaleDateString("en-US");
  };

  return (
    <div>
      <h3 className="pl-[2%]">Transactions</h3>
      {transactions.map((transaction: Transaction) => (
        <div key={transaction.checking_id}>
          <p className="pl-[2%] pt-[1%]">
            Received from: {transaction.bolt11.substring(0, 25)}...
          </p>
          <p className="pl-[2%] pt-[1%]">+{transaction.amount / 1000} sats</p>
          <p className="pl-[2%] pt-[1%] border-white border-b-black border">
            {formatDate(transaction)}
          </p>
        </div>
      ))}
    </div>
  );
};
export default Transactions;
