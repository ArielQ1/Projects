export const FilterBar = ({ filter, setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div className='flex items-center gap-4 mb-6'>
      <h2 className='text-xl font-bold text-blue-300'>Filtrar tareas</h2>
      <select
        value={filter}
        onChange={handleFilterChange}
        className='px-4 py-2 border border-primary rounded-lg bg-white text-primary focus:outline-none focus:ring-2 focus:ring-primary transition'
      >
        <option value='all'>Todas</option>
        <option value='pending'>Pendientes</option>
        <option value='in progress'>En progreso</option>
        <option value='completed'>Completadas</option>
      </select>
    </div>
  )
}
