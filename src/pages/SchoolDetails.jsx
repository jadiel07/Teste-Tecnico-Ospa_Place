import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function SchoolDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [school, setSchool] = useState(null)

  useEffect(() => {
    fetch(`https://data.cityofchicago.org/resource/9xs2-f89t.json?school_id=${id}`)
      .then(res => res.json())
      .then(data => setSchool(data[0]))
      .catch(err => console.error(err))
  }, [id])

  if (!school) {
    return (
      <div className="pb-28 p-5 text-center text-gray-500 min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="text-6xl mb-4">🏫</div>
          <p className="text-xl">Loading school details...</p>
        </div>
      </div>
    )
  }

  const schoolTypeMap = {
    ES: "Elementary School",
    HS: "High School",
    ESHS: "Elementary & High School"
  }

  const schoolType = schoolTypeMap[school.elementary_or_high_school] || "Not specified"
  const schoolName = school.name_of_school || school.school_name || school.long_name || `School ID: ${school.school_id}`
  
  const mapUrl = school.latitude && school.longitude
    ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.398!2d${school.longitude}!3d${school.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${school.latitude}%2C${school.longitude}!5e0!3m2!1sen!2sus!4v1630000000000`
    : null

  
  const getScoreDisplay = (score) => score ? `${score}/100` : '—'
  const getScoreColor = (score) => {
    const num = parseInt(score) || 0
    if (num >= 80) return 'bg-emerald-500 text-white'
    if (num >= 60) return 'bg-yellow-500 text-white'
    if (num >= 40) return 'bg-orange-500 text-white'
    return 'bg-red-500 text-white'
  }

  const getIconDisplay = (icon) => {
    const icons = {
      'Very Weak': '⭐', 'Weak': '⭐⭐', 'Average': '⭐⭐⭐',
      'Strong': '⭐⭐⭐⭐', 'Very Strong': '⭐⭐⭐⭐⭐'
    }
    return icons[icon] || icon || 'N/A'
  }

  return (
    <div className="pb-28 md:pb-32 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-8">
      <div className="max-w-6xl mx-auto">
        
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center mb-12 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 border border-gray-200/50 text-gray-800 font-semibold text-lg transition-all duration-300 hover:bg-white"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Schools
        </button>

        
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm -skew-x-3 -rotate-1"></div>
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight drop-shadow-lg">
                {schoolName}
              </h1>
              <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl font-bold text-lg shadow-xl">
                <span className="w-3 h-3 mr-3 bg-white/50 rounded-full"></span>
                {schoolType}
              </div>
            </div>
          </div>

          <div className="p-10 lg:p-16">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              
              <div className="space-y-8">
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">School Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard label="Address" value={
                      school.street_address ? `${school.street_address}, ${school.city || ""}` : "—"
                    } icon="📍" />
                    <InfoCard label="Phone" value={school.phone_number || "—"} icon="📞" />
                    <InfoCard label="Community" value={school.community_area_name || "—"} icon="🌳" />
                    <InfoCard label="ZIP Code" value={school.zip_code || "—"} icon="✉️" />
                    <InfoCard label="Network" value={school.network_manager || "—"} icon="🌐" />
                  </div>
                </div>

                
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    📊 Performance Metrics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PerformanceCard 
                      label="Safety" 
                      score={school.safety_score}
                      icon={getIconDisplay(school.safety_icon_)}
                      getScoreColor={getScoreColor}
                      getScoreDisplay={getScoreDisplay}
                    />
                    <PerformanceCard 
                      label="Instruction" 
                      score={school.instruction_score}
                      icon="📚"
                      getScoreColor={getScoreColor}
                      getScoreDisplay={getScoreDisplay}
                    />
                    <PerformanceCard 
                      label="Teachers" 
                      score={school.teachers_score}
                      icon="👩‍🏫"
                      getScoreColor={getScoreColor}
                      getScoreDisplay={getScoreDisplay}
                    />
                    <PerformanceCard 
                      label="Environment" 
                      score={school.environment_score}
                      icon="🏫"
                      getScoreColor={getScoreColor}
                      getScoreDisplay={getScoreDisplay}
                    />
                  </div>
                </div>

                
                {school.link_?.url && (
                  <div className="pt-4">
                    <a 
                      href={school.link_?.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group w-full flex items-center justify-center px-8 py-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500"
                    >
                      📄 View Official Progress Report
                      <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>

              
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Location</h2>
                {mapUrl ? (
                  <div className="relative rounded-2xl shadow-2xl overflow-hidden border-4 border-white/50 hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
                    <iframe
                      src={mapUrl}
                      width="100%"
                      height="500"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${schoolName} Location`}
                      className="w-full h-[500px] rounded-2xl"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-2xl border border-gray-200/50">
                      <span className="text-lg font-bold text-gray-800 flex items-center">
                        📍 {schoolName}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-dashed border-gray-300">
                    <div className="text-center text-gray-500">
                      <div className="text-6xl mb-6">📍</div>
                      <p className="text-xl font-semibold mb-2">Location not available</p>
                      <p className="text-base">Coordinates data missing</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ label, value, icon }) {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10 flex items-start space-x-4">
        <div className="w-12 h-12 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 text-xl">
          {icon}
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 group-hover:text-gray-700 transition-colors">
            {label}
          </p>
          <p className="text-xl font-bold text-gray-900 leading-relaxed group-hover:text-blue-600 transition-colors" title={value}>
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}

function PerformanceCard({ label, score, icon, getScoreColor, getScoreDisplay }) {
  const scoreValue = getScoreDisplay(score)
  const colorClass = getScoreColor(score)
  
  return (
    <div className="group relative bg-white shadow-xl rounded-2xl p-6 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:bg-gray-50">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-md flex-shrink-0 text-xl group-hover:bg-blue-100 transition-colors">
          {icon}
        </div>
        <span className={`px-3 py-1 text-xs font-bold rounded-lg ${colorClass}`}>
          {scoreValue}
        </span>
      </div>
      <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide group-hover:text-gray-900 transition-colors">
        {label}
      </p>
    </div>
  )
}

export default SchoolDetails
