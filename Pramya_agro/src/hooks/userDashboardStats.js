import { useEffect, useState } from "react"
import API from "../services/api"

export function useDashboardStats(){

  const [stats,setStats] = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    API.get("api/admin/dashboard")
    .then(res=>{
      setStats(res.data)
    })
    .catch(err=>{
      console.error(err.response?.data || err.message)
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])

  return {stats,loading}
}