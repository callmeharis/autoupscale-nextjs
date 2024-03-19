import timeSince from "../../utils/timeSince";
interface FormattedDateProps {
  date: Date | string;
  labelPrefix?: string;
  labelPostfix?: string;
  hideTime?: boolean | (() => boolean);
  showTimeSince?: boolean | (() => boolean);
  className?: string;
}

export default function ShowFormattedDate({
  date,
  labelPrefix,
  labelPostfix,
  hideTime,
  showTimeSince,
  className,
}: FormattedDateProps) {
  if (!!!date) return <></>;

  let displayDate: Date | string;

  if (showTimeSince) {
    displayDate = timeSince(date);
  } else {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: !!!hideTime ? "2-digit" : undefined,
      minute: !!!hideTime ? "2-digit" : undefined,
    });
    const generatedDate = formatter.format(
      typeof date === "string" ? new Date(date) : date
    );
    const parts = generatedDate.split("/");
    displayDate = `${parts[0]}/${parts[1]}/${parts[2]}`;
  }

  return (
    <span className={className}>
      {labelPrefix && labelPrefix}&nbsp;
      {displayDate}&nbsp;
      {labelPostfix && labelPostfix}&nbsp;
    </span>
  );
}
