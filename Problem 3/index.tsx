import { useMemo } from 'react'; // If you use React version 19, you don't need to use useMemo, React Compiler mechanism will handle memoization tasks by itself.

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added blockchain to the interface
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props {
  children?: React.ReactNode;
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Improve `getPriority` by using an object instead of a switch case
  // This makes the code cleaner and easier to extend
  const getPriority = (blockchain: string): number => {
    const priorityMap: Record<string, number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorityMap[blockchain] ?? -99; // Default to -99 if not found in the list
    // Should create an enum to store the values
  };

  const sortedBalances: FormattedWalletBalance[] = useMemo(() => {
    return (
      balances
        .reduce<FormattedWalletBalance[]>(
          (acc: FormattedWalletBalance[], balance: WalletBalance) => {
            const priority = getPriority(balance.blockchain);

            // Filter: Skip balances with low priority or zero amount
            if (priority <= -99 || balance.amount <= 0) return acc;

            // Map: Format amount
            acc.push({
              ...balance,
              formatted: balance.amount.toFixed(),
            });

            return acc;
          },
          []
        )
        // Sort: Sort by blockchain priority after reducing, Optimize sorting by subtracting directly instead of using `if-else`
        .sort(
          (lhs: FormattedWalletBalance, rhs: FormattedWalletBalance) =>
            getPriority(rhs.blockchain) - getPriority(lhs.blockchain) // Simplified sorting logic
        )
    );
  }, [balances]); // Removed `prices` from dependencies since it does not affect sorting logic

  return (
    <div {...rest}>
      {sortedBalances.map((balance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            // className={classes.row} // This variable has not been declared.
            key={balance.currency} // Using currency as key is more stable than index
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      })}
    </div>
  );
};
