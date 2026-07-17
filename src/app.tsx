import {createBrowserRouter, RouterProvider} from "react-router"
import { CreateTripPage } from "./pages/create-trip"
import { TripDatailsPage } from "./pages/trip-datails"



const router = createBrowserRouter([
  {
    path: "",
    element: <CreateTripPage/>,
  },

  {
    path: "/trips/:tripId",
    element: <TripDatailsPage/>,
  }


])

export function App () {
  return <RouterProvider router={router}/>
}
