function StatCard({ label, value }) {
  return (
    <div style={{
      background: "#f8f9fa",
      padding: "16px",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
    }}>
      <p style={{ 
        fontSize: "12px", 
        color: "#6c757d", 
        marginBottom: "6px" 
      }}>
        {label}
      </p>

      <p style={{ 
        fontSize: "16px", 
        fontWeight: "600",
        color: "#212529"
      }}>
        {value || "Not available"}
      </p>
    </div>
  )
}

export default StatCard
