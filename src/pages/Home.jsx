import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Home() {
  const [schools, setSchools] = useState([])
  const [search, setSearch] = useState("")
  const [schoolType, setSchoolType] = useState("ALL")
  const [safetyIcon, setSafetyIcon] = useState("ALL")
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://data.cityofchicago.org/resource/9xs2-f89t.json?$limit=100")
      .then(res => res.json())
      .then(data => setSchools(data))
      .catch(err => console.error(err))
  }, [])

  const filteredSchools = schools.filter(school => {
    const matchesType = schoolType === "ALL" || school.elementary_or_high_school === schoolType
    const matchesSafety = safetyIcon === "ALL" || school.safety_icon_ === safetyIcon
    const matchesSearch = 
      !search ||
      school.school_name?.toLowerCase().includes(search.toLowerCase()) ||
      school.city?.toLowerCase().includes(search.toLowerCase()) ||
      school.long_name?.toLowerCase().includes(search.toLowerCase()) ||
      school.name_of_school?.toLowerCase().includes(search.toLowerCase())

    return matchesType && matchesSafety && matchesSearch
  })

  const getSafetyIconDisplay = (icon) => {
    const stars = {
      'Very Weak': '⭐',
      'Weak': '⭐⭐',
      'Average': '⭐⭐⭐', 
      'Strong': '⭐⭐⭐⭐',
      'Very Strong': '⭐⭐⭐⭐⭐'
    }
    return stars[icon] || icon || 'N/A'
  }

  return (
    <div className="pb-28 md:pb-32 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center mb-8 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 border border-gray-200/50 text-gray-800 font-semibold text-lg transition-all duration-300 hover:bg-white"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>

          <header className="text-center">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-6 leading-tight">
              Chicago Public Schools
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore detailed public school data from the City of Chicago
            </p>
          </header>
        </div>

        
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-12 shadow-xl border border-white/40">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
           
            <div>
              <input
                type="text"
                placeholder="Search by school name, city or address..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 shadow-lg transition-all duration-300 hover:shadow-xl"
              />
            </div>

            
            <div className="space-y-4">
              
              <div>
                <label className="block mb-2 font-bold text-lg text-gray-800">School Type</label>
                <select
                  value={schoolType}
                  onChange={e => setSchoolType(e.target.value)}
                  className="w-full px-5 py-3.5 text-lg rounded-xl border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <option value="ALL">All Schools</option>
                  <option value="ES">Elementary School</option>
                  <option value="HS">High School</option>
                </select>
              </div>

              
              <div>
                <label className="block mb-2 font-bold text-lg text-gray-800">Safety Rating</label>
                <select
                  value={safetyIcon}
                  onChange={e => setSafetyIcon(e.target.value)}
                  className="w-full px-5 py-3.5 text-lg rounded-xl border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-3 focus:ring-yellow-500/30 focus:border-yellow-500 shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <option value="ALL">All Safety Ratings</option>
                  <option value="Very Weak">⭐ Very Weak</option>
                  <option value="Weak">⭐⭐ Weak</option>
                  <option value="Average">⭐⭐⭐ Average</option>
                  <option value="Strong">⭐⭐⭐⭐ Strong</option>
                  <option value="Very Strong">⭐⭐⭐⭐⭐ Very Strong</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS INFO */}
        <div className="mb-10 text-center">
          <p className="text-3xl font-black text-gray-800 mb-2">
            Showing <span className="text-blue-600">{filteredSchools.length}</span> of {schools.length} schools
          </p>
          {safetyIcon !== "ALL" && (
            <p className="text-lg text-yellow-700 bg-yellow-100 px-4 py-2 rounded-xl inline-flex items-center">
              Filtered by {getSafetyIconDisplay(safetyIcon)}
            </p>
          )}
        </div>

        {/* SCHOOLS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredSchools.length === 0 ? (
            <div className="col-span-full text-center py-24">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">No schools found</h3>
              <p className="text-xl text-gray-600 max-w-lg mx-auto">
                Try adjusting your search, school type, or safety rating filters.
              </p>
            </div>
          ) : null}

          {filteredSchools.map(school => {
            const name =
              school.name_of_school ||
              school.school_name ||
              school.long_name ||
              `School ID: ${school.school_id}`
            const safetyDisplay = getSafetyIconDisplay(school.safety_icon_)

            return (
              <SchoolCard
                key={school.school_id}
                school={school}
                name={name}
                type={school.elementary_or_high_school}
                safetyDisplay={safetyDisplay}
                onClick={() => navigate(`/school/${school.school_id}`)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function SchoolCard({ school, name, type, safetyDisplay, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-7 cursor-pointer border border-white/50 shadow-xl hover:shadow-3xl hover:-translate-y-3 hover:bg-white transition-all duration-500 overflow-hidden active:translate-y-0"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 -skew-x-3 -rotate-1 group-hover:rotate-0 group-hover:skew-x-0 transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
      
      <div className="relative z-10">
        
        <div className="mb-4">
          <div className={`inline-flex items-center px-3 py-2 text-sm font-bold rounded-xl shadow-md ${
            school.safety_icon_ === 'Very Strong' ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-white'
            : school.safety_icon_ === 'Strong' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white'
            : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
          }`}>
            {safetyDisplay}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
          {name}
        </h3>

        <p className="text-sm text-gray-600 mb-6 font-medium">
          {school.city || "Chicago"}
        </p>

        
        {type && (
          <div className="mb-6">
            <span className={`inline-flex px-4 py-2 text-sm font-bold rounded-xl shadow-md ${
              type === "ES" 
                ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white" 
                : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
            }`}>
              {type === "ES" ? "Elementary" : "High School"}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full group-hover:animate-ping"></div>
          <button className="text-sm text-blue-600 font-bold group-hover:text-blue-700 flex items-center space-x-1 hover:space-x-2 transition-all">
            View details
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
