import { useFilterContext } from "@/context/FilterContext";

type Option = {
  OptionID: number;
  OptionName: string;
};

type Props = {
  filterId: number;
  filterName: string;
  options: Option[];
};

const FilterGroup = ({ filterId, filterName, options }: Props) => {
  const { selectedFilters, toggleOption } = useFilterContext();

  return (
    <div className="mb-4">
      <h3 className="font-bold">{filterName}</h3>
      <div className="space-y-2">
        {options.map(option => {
          const isChecked =
            selectedFilters[filterId]?.includes(option.OptionID) || false;
          return (
            <div
              key={option.OptionID}
              className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleOption(filterId, option.OptionID)}
                id={`filter-${filterId}-option-${option.OptionID}`}
              />
              <label
                htmlFor={`filter-${filterId}-option-${option.OptionID}`}
                className="ml-2">
                {option.OptionName}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterGroup;
