import Layout from '../components/layout';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Schools() {
  const [schools, setSchools] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    state: '',
    province: '',
    schoolType: '',
  });
  const [filterOptions, setFilterOptions] = useState({
    states: [],
    schoolTypes: [],
    categories: [],
  });
  const [provinces, setProvinces] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

  const schoolsPerPage = 9;

  // Fetch filter options from API
  const fetchFilterOptions = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/filters`);
      if (!response.ok) throw new Error('Fehler beim Abrufen der Filterdaten.');

      const data = await response.json();
      setFilterOptions(data);

      const sortedStates = [...data.states].sort();
      const sortedSchoolTypes = [...data.schoolTypes].sort();
      const sortedCategories = [...data.categories].sort();
      const sortedProvinces = [...data.provinces].sort();

      setFilterOptions({
        states: sortedStates,
        schoolTypes: sortedSchoolTypes,
        categories: sortedCategories,
        provinces: sortedProvinces,
      });

    } catch (error) {
      console.error('Fehler beim Laden der Filteroptionen:', error);
    }
  };

  // Fetch schools from API
  const fetchSchools = async (page = 1) => {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit: schoolsPerPage,
        ...filters,
      });
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/data?${queryParams}`);
      if (!response.ok) throw new Error('Fehler beim Abrufen der Schulen.');

      const { schools, total } = await response.json();
      setSchools(schools);
      setPagination({ currentPage: page, totalPages: Math.ceil(total / schoolsPerPage) });
    } catch (error) {
      console.error('Fehler beim Laden der Schulen:', error);
    }
  };

  // Fetch provinces when state changes
  const fetchProvinces = async (state) => {
    if (!state) {
      setProvinces([]); // Reset provinces when no state is selected
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/districts?state=${encodeURIComponent(state)}`
      );
      if (!response.ok) throw new Error('Fehler beim Abrufen der Bezirke.');

      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error('Fehler beim Laden der Bezirke:', error);
    }
  };

  // Handle filter updates
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    if (key === 'state') {
      fetchProvinces(value); // Update provinces when state changes
    }
  };

  useEffect(() => {
    fetchFilterOptions(); // Lade die Filteroptionen bei der Initialisierung
  }, []);

  useEffect(() => {
    fetchSchools(pagination.currentPage); // Lade die Schulen bei Filteränderung
  }, [filters, pagination.currentPage]);

  return (
    <Layout>
      <div className="sub">
        <div className="container section-title" data-aos="fade-up">
          <h2>Unsere vorgestellten Schulen</h2>
          <p style={{ color: '#a036d1' }}>Alle Schulen im Überblick</p>
        </div>

        {/* Filter Form */}
        <div className="container mb-4">
          <form id="filter-form" className="row g-3">
            {/* Suchfeld */}
            <div className="col-md-4">
              <label htmlFor="search-bar" className="form-label">
                Suchbegriff
              </label>
              <input
                type="text"
                id="search-bar"
                placeholder="Nach Schulen oder Schwerpunkten suchen..."
                className="form-control"
                onChange={(e) => updateFilter('search', e.target.value)}
              />
            </div>

            {/* Schularten Dropdown */}
            <div className="col-md-4">
              <label htmlFor="schoolType" className="form-label">
                Schulart
              </label>
              <select
                id="schoolType"
                className="form-select"
                onChange={(e) => updateFilter('schoolType', e.target.value)}
              >
                <option value="">Alle</option>
                {filterOptions.schoolTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Bundesländer Dropdown */}
            <div className="col-md-4">
              <label htmlFor="state" className="form-label">
                Bundesland
              </label>
              <select
                id="state"
                className="form-select"
                onChange={(e) => updateFilter('state', e.target.value)}
              >
                <option value="">Alle</option>
                {filterOptions.states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Bezirke Dropdown */}
            <div className="col-md-4">
              <label htmlFor="province" className="form-label">
                Bezirk
              </label>
              <select
                id="province"
                className="form-select"
                onChange={(e) => updateFilter('province', e.target.value)}
                disabled={!filters.state} // Deaktiviert den Dropdown, wenn kein Bundesland ausgewählt wurde
              >
                <option value="">Alle</option>
                {provinces.map((province, index) => (
                  <option key={index} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>


            {/* Kategorien Dropdown */}
            <div className="col-md-4">
              <label htmlFor="category" className="form-label">
                Kategorie
              </label>
              <select
                id="category"
                className="form-select"
                onChange={(e) => updateFilter('category', e.target.value)}
              >
                <option value="">Alle</option>
                {filterOptions.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {/* School List */}
        <div id="school-list" className="row justify-content-center">
          {schools.map((school) => (
            <div
              key={school.id}
              className="school-preview col-xl-4 col-md-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <article>
                <Link
                  href={`/school-details/${school.id}`}
                  className="subpage-link"
                  data-title={`${school.name} - Details`}
                >
                  <div className="post-img">
                    <img
                      src={school.image_url || '/img/default-school.jpg'}
                      alt={school.name}
                      className="img-fluid"
                    />
                  </div>
                </Link>
                <h5 className="title">
                  <Link href={`/school-details/${school.id}`} className="subpage-link">
                    {school.name}
                  </Link>
                </h5>
                <p className="post-category">
                  <strong>Schulart:</strong> {school.school_type || 'Nicht angegeben'}
                </p>
                <p className="post-category">
                <strong>Fachrichtungen:</strong>{' '}
                {school.subjects ? (
                  <span
                    data-tippy-content={school.subjects} 
                    style={{ cursor: 'pointer' }} 
                  >
                    {school.subjects.length > 40
                      ? `${school.subjects.slice(0, 40)}...`
                      : school.subjects}
                  </span>
                ) : (
                  'Nicht angegeben'
                )}
              </p>
              </article>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div id="pagination" className="pagination-controls">
          <button
            className="btn btn-primary"
            onClick={() =>
              setPagination((prev) => ({ ...prev, currentPage: Math.max(prev.currentPage - 1, 1) }))
            }
            disabled={pagination.currentPage === 1}
          >
            Zurück
          </button>
          <span>
            Seite {pagination.currentPage} von {pagination.totalPages}
          </span>
          <button
            className="btn btn-primary"
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                currentPage: Math.min(prev.currentPage + 1, pagination.totalPages),
              }))
            }
            disabled={pagination.currentPage === pagination.totalPages}
          >
            Weiter
          </button>
        </div>
      </div>
    </Layout>
  );
}
