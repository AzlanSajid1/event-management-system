import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents, loadCategories } from '../store/eventsSlice';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';

function Events() {
  const dispatch = useDispatch();
  const { items, page: pageInfo, categories, loading, error } = useSelector(
    (state) => state.events
  );

  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  useEffect(() => {
    const params = { page };
    if (filters.keyword) params.keyword = filters.keyword;
    if (filters.category) params.segmentId = filters.category;
    if (filters.city) params.city = filters.city;

    // Only show upcoming events by default
    const now = new Date().toISOString().split('.')[0] + 'Z';
    params.startDateTime = filters.startDate ? `${filters.startDate}T00:00:00Z` : now;
    if (filters.endDate) params.endDateTime = `${filters.endDate}T23:59:59Z`;

    dispatch(loadEvents(params));
  }, [dispatch, filters, page]);

  const handleApply = (newFilters) => {
    setFilters(newFilters);
    setPage(0);
  };

  // The API only allows paging up to 1000 results, so cap at 50 pages
  const totalPages = Math.min(pageInfo?.totalPages || 0, 50);

  return (
    <div>
      <h2>Upcoming Events</h2>
      <SearchBar categories={categories} onApply={handleApply} />

      {loading && <p>Loading events...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && items.length === 0 && <p>No events found.</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1rem',
          padding: '1rem',
        }}
      >
        {!loading && items.map((event) => <EventCard key={event.id} event={event} />)}
      </div>

      {totalPages > 1 && (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', padding: '1rem' }}>
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>
            Previous
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Events;