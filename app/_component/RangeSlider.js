import styles from "./RangeSlider.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function RangeSlider() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const range = searchParams.get("range");

  return (
    <input
      className="absolute bottom-[80px] right-8"
      orient="270deg"
      type="range"
      min="10"
      value={range}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams);
        params.set("range", e.target.value);
        replace(`${pathname}?${params.toString()}`);
      }}
      max="100"
      step="1"
    />
  );
}

export default RangeSlider;
