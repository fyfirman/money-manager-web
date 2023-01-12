import dayjs from "dayjs";

interface TransactionSubheaderProps {
  date: dayjs.Dayjs;
}

const TransactionSubheader: React.FC<TransactionSubheaderProps> = ({ date }) => {
  return (
    <div className="flex flex-row gap-1 items-center text-gray-600">
      <span className="font-semibold text-base">{date.format("DD")}</span>
      <span className="px-1.5 rounded-sm  bg-gray-600 text-gray-200 text-xs">
        {date.format("ddd")}
      </span>
      <span className="rounded-sm text-xs">{date.format("MM/YYYY")}</span>
    </div>
  );
};

export default TransactionSubheader;
