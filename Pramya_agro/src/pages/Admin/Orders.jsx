import { useEffect,useState } from "react";
import API from "../../services/api";

export default function Orders(){

const [orders,setOrders] = useState([]);

useEffect(()=>{

API.get("/admin/orders")
.then(res=>setOrders(res.data))

},[])

const updateStatus = async(id,status)=>{

await API.put(`/admin/orders/${id}`,{status})

window.location.reload()

}

return(

<div>

<h1 className="text-2xl font-bold mb-6">
Orders
</h1>

<table className="w-full border border-white/10">

<thead className="bg-black/40">

<tr>

<th className="p-3">Order ID</th>
<th>User</th>
<th>Total</th>
<th>Status</th>
<th>Update</th>

</tr>

</thead>

<tbody>

{orders.map(order =>(

<tr key={order.id} className="border-t border-white/10">

<td className="p-3">{order.id}</td>
<td>{order.user}</td>
<td>₹{order.total_price}</td>

<td>{order.status}</td>

<td>

<select
onChange={(e)=>updateStatus(order.id,e.target.value)}
className="bg-black border border-white/10 p-1"
>

<option>pending</option>
<option>shipped</option>
<option>delivered</option>

</select>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}