import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Dashboard() {
  const [stats, setStats] = useState({
    totalSchools: 0,
    elementary: 0,
    highSchools: 0,
    avgSafety: 0,
    avgInstruction: 0,
    avgTeachers: 0,
    loading: true
  })
  const [topSchools, setTopSchools] = useState([])
  const [topPerformance, setTopPerformance] = useState([])

  useEffect(() => {
    fetch("https://data.cityofchicago.org/resource/9xs2-f89t.json?$limit=500")
      .then(res => res.json())
      .then(data => {
        const elementary = data.filter(s => s.elementary_or_high_school === 'ES').length
        const highSchools = data.filter(s => s.elementary_or_high_school === 'HS').length
        
        
        const totalSchools = data.length
        
        
        const safetyScores = data
          .filter(s => s.safety_score && !isNaN(parseInt(s.safety_score)))
          .map(s => parseInt(s.safety_score))
        const instructionScores = data
          .filter(s => s.instruction_score && !isNaN(parseInt(s.instruction_score)))
          .map(s => parseInt(s.instruction_score))
        const teachersScores = data
          .filter(s => s.teachers_score && !isNaN(parseInt(s.teachers_score)))
          .map(s => parseInt(s.teachers_score))

        const avgSafety = safetyScores.length ? (safetyScores.reduce((a, b) => a + b) / safetyScores.length).toFixed(1) : 0
        const avgInstruction = instructionScores.length ? (instructionScores.reduce((a, b) => a + b) / instructionScores.length).toFixed(1) : 0
        const avgTeachers = teachersScores.length ? (teachersScores.reduce((a, b) => a + b) / teachersScores.length).toFixed(1) : 0
        
        // Top 10 Safest
        const topSafest = data
          .filter(s => s.safety_score && !isNaN(parseInt(s.safety_score)))
          .sort((a, b) => parseInt(b.safety_score) - parseInt(a.safety_score))
          .slice(0, 10)
        
        
        const topInstruction = data
          .filter(s => s.instruction_score && !isNaN(parseInt(s.instruction_score)))
          .sort((a, b) => parseInt(b.instruction_score) - parseInt(a.instruction_score))
          .slice(0, 5)

        setStats({
          totalSchools,
          elementary,
          highSchools,
          avgSafety,
          avgInstruction,
          avgTeachers,
          loading: false
        })
        setTopSchools(topSafest)
        setTopPerformance(topInstruction)
      })
      .catch(err => {
        console.error(err)
        setStats(prev => ({ ...prev, loading: false }))
      })
  }, [])

  if (stats.loading) {
    return (
      <div className="pb-28 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="animate-pulse">
            <div className="h-20 bg-gray-300 rounded-lg mx-auto w-96 mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getSafetyScoreDisplay = (score) => {
    const num = parseInt(score) || 0
    const stars = '⭐'.repeat(Math.floor(num / 20))
    return `${stars} ${num}`
  }

  const getPerformanceColor = (score) => {
    const num = parseInt(score) || 0
    if (num >= 80) return 'text-emerald-600 bg-emerald-100'
    if (num >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="pb-28 md:pb-32 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-6 leading-tight">
            Chicago Data Platform
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform public school data into smart decisions for public management
          </p>
        </div>

        {/* BASIC STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="group relative bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/60 overflow-hidden hover:shadow-3xl hover:-translate-y-3 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 -skew-x-3 -rotate-1 group-hover:rotate-0 group-hover:skew-x-0 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full group-hover:animate-bounce"></div>
                <span className="px-4 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-xs font-bold rounded-full shadow-sm">TOTAL</span>
              </div>
              <p className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                {stats.totalSchools.toLocaleString()}
              </p>
              <p className="text-lg font-semibold text-gray-700 uppercase tracking-wide">Public Schools</p>
            </div>
          </div>

          <div className="group relative bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/60 overflow-hidden hover:shadow-3xl hover:-translate-y-3 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 opacity-50 -skew-x-3 -rotate-1 group-hover:rotate-0 group-hover:skew-x-0 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">🏫</div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full shadow-sm">ES</span>
              </div>
              <p className="text-5xl md:text-6xl font-black text-emerald-600 mb-4">{stats.elementary.toLocaleString()}</p>
              <p className="text-lg font-semibold text-gray-700 uppercase tracking-wide">Elementary</p>
            </div>
          </div>

          <div className="group relative bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/60 overflow-hidden hover:shadow-3xl hover:-translate-y-3 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-50 -skew-x-3 -rotate-1 group-hover:rotate-0 group-hover:skew-x-0 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">🏛️</div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full shadow-sm">HS</span>
              </div>
              <p className="text-5xl md:text-6xl font-black text-blue-600 mb-4">{stats.highSchools.toLocaleString()}</p>
              <p className="text-lg font-semibold text-gray-700 uppercase tracking-wide">High Schools</p>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="group relative bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/60 overflow-hidden hover:shadow-3xl hover:-translate-y-3 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-50 -skew-x-3 -rotate-1 group-hover:rotate-0 group-hover:skew-x-0 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">🛡️</div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full shadow-sm">AVG</span>
              </div>
              <p className="text-5xl md:text-6xl font-black text-yellow-600 mb-4">{stats.avgSafety}</p>
              <p className="text-lg font-semibold text-gray-700 uppercase tracking-wide">Safety Score</p>
            </div>
          </div>

          <div className="group relative bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/60 overflow-hidden hover:shadow-3xl hover:-translate-y-3 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-50 -skew-x-3 -rotate-1 group-hover:rotate-0 group-hover:skew-x-0 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">📚</div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full shadow-sm">AVG</span>
              </div>
              <p className="text-5xl md:text-6xl font-black text-emerald-600 mb-4">{stats.avgInstruction}</p>
              <p className="text-lg font-semibold text-gray-700 uppercase tracking-wide">Instruction</p>
            </div>
          </div>

          <div className="group relative bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/60 overflow-hidden hover:shadow-3xl hover:-translate-y-3 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-50 -skew-x-3 -rotate-1 group-hover:rotate-0 group-hover:skew-x-0 transition-all duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">👩‍🏫</div>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full shadow-sm">AVG</span>
              </div>
              <p className="text-5xl md:text-6xl font-black text-purple-600 mb-4">{stats.avgTeachers}</p>
              <p className="text-lg font-semibold text-gray-700 uppercase tracking-wide">Teachers</p>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 overflow-hidden">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg mr-4">🏆</div>
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">Top Safest Schools</h2>
                <p className="text-lg text-gray-600">Ranked by safety score</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <th className="text-left py-4 pl-0 font-bold text-gray-800">#</th>
                  <th className="text-left py-4 font-bold text-gray-800 pr-8">School</th>
                  <th className="text-left py-4 font-bold text-gray-800">Score</th>
                </tr></thead>
                <tbody>
                  {topSchools.slice(0, 5).map((school, i) => (
                    <tr key={school.school_id} className="hover:bg-blue-50/50 border-b border-gray-100 h-14">
                      <td className="font-black text-2xl text-gray-900 pl-0 pr-4">{i + 1}</td>
                      <td className="font-semibold text-gray-900 max-w-md truncate pr-8">{school.name_of_school}</td>
                      <td className="font-bold text-lg text-emerald-600">{getSafetyScoreDisplay(school.safety_score)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 overflow-hidden">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg mr-4">📚</div>
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">Top Instruction</h2>
                <p className="text-lg text-gray-600">Best teaching quality</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                  <th className="text-left py-4 pl-0 font-bold text-gray-800">#</th>
                  <th className="text-left py-4 font-bold text-gray-800 pr-8">School</th>
                  <th className="text-left py-4 font-bold text-gray-800">Score</th>
                </tr></thead>
                <tbody>
                  {topPerformance.slice(0, 5).map((school, i) => (
                    <tr key={school.school_id} className="hover:bg-emerald-50/50 border-b border-gray-100 h-14">
                      <td className="font-black text-2xl text-gray-900 pl-0 pr-4">{i + 1}</td>
                      <td className="font-semibold text-gray-900 max-w-md truncate pr-8">{school.name_of_school}</td>
                      <td className={`font-bold text-lg ${getPerformanceColor(school.instruction_score)}`}>
                        {school.instruction_score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        
        <div className="text-center">
          <Link 
            to="/schools"
            className="group relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 backdrop-blur-sm -skew-x-12 -rotate-2 group-hover:rotate-0 group-hover:skew-x-0 transition-all duration-500"></span>
            <span className="relative z-10 flex items-center space-x-3 group-hover:translate-x-2 transition-transform">
              <span>🚀 Explore All Schools</span>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
