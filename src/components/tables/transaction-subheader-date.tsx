import dayjs from "dayjs";

interface TransactionSubheaderDateProps {
  date: dayjs.Dayjs;
}

const TransactionSubheaderDate: React.FC<TransactionSubheaderDateProps> = ({ date }) => {
  return (
    <div className="flex flex-row gap-1 items-center text-gray-800">
      <span className="font-semibold text-base">{date.format("DD")}</span>
      <span className="px-1.5 rounded-sm  bg-gray-600 text-gray-200 text-xs">
        {date.format("ddd")}
      </span>
      <span className="rounded-sm text-xs">{date.format("MM/YYYY")}</span>
    </div>
  );
};

export default TransactionSubheaderDate;
