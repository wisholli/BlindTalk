import { useAppSelector } from "../../app/hooks";
import { ActiveCheckBox } from "../../types";

interface Props {
  checkBoxNumber: string;
  toggleIndex: (value: string) => void;
  activeCheckBoxes: ActiveCheckBox;
}

export const CheckBox = ({
  activeCheckBoxes,
  checkBoxNumber,
  toggleIndex,
}: Props) => {
  return (
    <div
      onClick={() => toggleIndex(checkBoxNumber)}
      className="flex items-center cursor-pointer "
    >
      <div
        className={`flex items-center justify-center border h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8  ${
          activeCheckBoxes[checkBoxNumber as keyof ActiveCheckBox]
            ? "bg-green-100"
            : "border-gray-100 bg-white"
        } `}
      ></div>
    </div>
  );
};
