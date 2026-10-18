import { useState } from 'react';

const emptyForm = { keyword: '', category: '', city: '', startDate: '', endDate: '' };

function SearchBar({ categories, onApply }) {
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply(form);
  };

  const handleReset = () => {
    setForm(emptyForm);
    onApply(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit} className="filters">
      <input
        name="keyword"
        placeholder="Search events..."
        value={form.keyword}
        onChange={handleChange}
      />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
      <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
      <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
      <button type="submit">Search</button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}

export default SearchBar;