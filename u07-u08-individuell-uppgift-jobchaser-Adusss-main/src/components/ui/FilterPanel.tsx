import { useFilterStore } from "../../store/filterStore";
import "../../css/filterpanel.css";

export default function FilterPanel() {
  const text = useFilterStore((s) => s.text);
  const location = useFilterStore((s) => s.location);

  const setText = useFilterStore((s) => s.setText);
  const setLocation = useFilterStore((s) => s.setLocation);
  const clearFilters = useFilterStore((s) => s.clearFilters);

  return (
    <div className="filter-main">
      <div className="filter-inputBox_container">
        <p>Filters:</p>

        <div>
          <input className="filter-inputBox" type="text" placeholder="Filter by text" value={text} onChange={(e) => setText(e.target.value)} />
        </div>

        <div>
          <input className="filter-inputBox" type="text" placeholder="Filter by city" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        <button className="filter-button-clear" onClick={clearFilters}>
          Clear
        </button>
      </div>
    </div>
  );
}
