import axios from 'axios'

export let orders = []
axios.post("/reservations/allslots", { headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` } })
    .then(res => { res.data.forEach(e => orders.push(e)) });



// let i = 1;
// export const orders = [
//     {
//         orderId: "251-33-AL",
//         status: "busy",
//         date: "2021-04-13",
//         price: i++,
//         startTime: "13:00",
//         reservedTime: "3h",
//         user: "John Doe",
//         location: "DRD-4",

//     },
//     {
//         orderId: "143-58-AL",
//         status: "schedule",
//         price: i++,
//         date: "2021-04-11",
//         startTime: "13:00",
//         reservedTime: "3h",
//         user: "Xohn Doe",
//         location: "DRD-4",

//     },
//     {
//         orderId: "651-33-AL",
//         status: "schedule",
//         price: i++,
//         date: "2021-03-16",
//         startTime: "13:00",
//         reservedTime: "3h",
//         user: "Aohn Doe",
//         location: "DRD-4",

//     },
//     {
//         orderId: "793-55-AL",
//         status: "busy",
//         price: i++,
//         date: "2021-03-28",
//         startTime: "13:00",
//         reservedTime: "3h",
//         user: "Lohn Doe",
//         location: "MAT-2",

//     },
//     {
//         orderId: "251-33-AL",
//         status: "completed",
//         price: i++,
//         date: "2021-03-25",
//         startTime: "15:00",
//         reservedTime: "2h",
//         user: "Kohn Doe",
//         location: "ARB-4",
//     },
//     {
//         orderId: "651-33-AL",
//         status: "schedule",
//         price: i++,
//         date: "2021-03-27",
//         startTime: "13:00",
//         reservedTime: "3h",
//         user: "Aohn Doe",
//         location: "DRD-4",

//     },
//     {
//         orderId: "793-55-AL",
//         status: "busy",
//         price: i++,
//         date: "2021-04-27",
//         startTime: "13:00",
//         reservedTime: "3h",
//         user: "Lohn Doe",
//         location: "MAT-2",

//     },
//     {
//         orderId: "251-33-AL",
//         status: "completed",
//         price: i++,
//         date: "2021-04-23",
//         startTime: "15:00",
//         reservedTime: "2h",
//         user: "Kohn Doe",
//         location: "ARB-4",
//     },
//     {
//         orderId: "651-33-AL",
//         status: "schedule",
//         price: i++,
//         date: "2021-04-11",
//         startTime: "13:00",
//         reservedTime: "3h",
//         user: "Aohn Doe",
//         location: "DRD-4",

//     },
//     {
//         orderId: "793-55-AL",
//         status: "busy",
//         price: i++,
//         date: "2021-03-11",
//         startTime: "13:00",
//         reservedTime: "3h",
//         user: "Lohn Doe",
//         location: "MAT-2",

//     },
//     {
//         orderId: "251-33-AL",
//         status: "completed",
//         price: i++,
//         date: "2021-03-13",
//         startTime: "15:00",
//         reservedTime: "2h",
//         user: "Kohn Doe",
//         location: "ARB-4",
//     },
//     {
//         orderId: "651-33-AL",
//         status: "schedule",
//         price: i++,
//         date: "2021-03-15",
//         startTime: "13:00",
//         reservedTime: "3h",
//         user: "Aohn Doe",
//         location: "DRD-4",

//     },
//     {
//         orderId: "793-55-AL",
//         status: "busy",
//         price: i++,
//         date: "2021-03-16",
//         startTime: "13:00",
//         reservedTime: "3h",
//         user: "Lohn Doe",
//         location: "MAT-2",

//     },
//     {
//         orderId: "251-33-AL",
//         status: "completed",
//         price: i++,
//         date: "2021-03-17",
//         startTime: "15:00",
//         reservedTime: "2h",
//         user: "Kohn Doe",
//         location: "ARB-4",
//     },
//     {
//         orderId: "651-33-AL",
//         status: "schedule",
//         price: i++,
//         date: "2021-02-11",
//         startTime: "13:00",
//         reservedTime: "3h",
//         user: "Aohn Doe",
//         location: "DRD-4",

//     },
//     {
//         orderId: "793-55-AL",
//         status: "busy",
//         price: i++,
//         date: "2021-02-12",
//         startTime: "13:00",
//         reservedTime: "3h",
//         user: "Lohn Doe",
//         location: "MAT-2",

//     },
//     {
//         orderId: "251-33-AL",
//         status: "completed",
//         price: i++,
//         date: "2021-02-13",
//         startTime: "15:00",
//         reservedTime: "2h",
//         user: "Kohn Doe",
//         location: "ARB-4",
//     },
//     {
//         orderId: "651-33-AL",
//         status: "schedule",
//         price: i++,
//         date: "2021-02-14",
//         startTime: "13:00",
//         reservedTime: "3h",
//         user: "Aohn Doe",
//         location: "DRD-4",

//     },
//     {
//         orderId: "793-55-AL",
//         status: "busy",
//         price: i++,
//         date: "2021-02-15",
//         startTime: "13:00",
//         reservedTime: "3h",
//         user: "Lohn Doe",
//         location: "MAT-2",

//     },
//     {
//         orderId: "251-33-AL",
//         status: "completed",
//         price: i++,
//         date: "2021-02-16",
//         startTime: "15:00",
//         reservedTime: "2h",
//         user: "Kohn Doe",
//         location: "ARB-4",
//     },
//     {
//         orderId: "251-33-AL",
//         status: "completed",
//         price: i++,
//         date: "2021-01-31",
//         startTime: "15:00",
//         reservedTime: "2h",
//         user: "Kohn Doe",
//         location: "ARB-4"
//     },
//     {
//         orderId: "251-33-AL",
//         status: "completed",
//         price: i++,
//         date: "2021-06-30",
//         startTime: "15:00",
//         reservedTime: "2h",
//         user: "Kohn Doe",
//         location: "ARB-4"
//     },
//     {
//         orderId: "251-33-AL",
//         status: "completed",
//         price: i++,
//         date: "2021-06-30",
//         startTime: "15:00",
//         reservedTime: "2h",
//         user: "Kohn Doe",
//         location: "ARB-4"
//     },
//     {
//         orderId: "251-33-AL",
//         status: "completed",
//         price: i++,
//         date: "2021-06-30",
//         startTime: "15:00",
//         reservedTime: "2h",
//         user: "Kohn Doe",
//         location: "ARB-4"
//     }
// ]