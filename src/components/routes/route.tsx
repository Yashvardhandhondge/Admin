import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Input } from '../ui/input'
import { Plus, Trash2 } from 'lucide-react'
import { useAirlineStore } from '../../store/useAirlineStore';
import { Checkbox } from '../ui/checkbox'

function route() {
    const [routes, setRoutes] = React.useState([{
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        duration: '',
        flight: '',
        startingPrice: '',
        cheapestFlight: false,
        highestSelling: false
    }]);
    const {
        airlineStations,
        loading
    } = useAirlineStore();
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Routes
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setRoutes([...routes, {
                                origin: '',
                                destination: '',
                                departureTime: '',
                                arrivalTime: '',
                                duration: '',
                                flight: '',
                                startingPrice: '',
                                cheapestFlight: false,
                                highestSelling: false
                            }])}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Route
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>S.No.</TableHead>
                                <TableHead>Origin</TableHead>
                                <TableHead>Destination</TableHead>
                                <TableHead>Departure Time</TableHead>
                                <TableHead>Arrival Time</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Flight</TableHead>
                                <TableHead>Starting Price</TableHead>
                                <TableHead>Cheapest Flight</TableHead>
                                <TableHead>Highest Selling</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {routes.map((route, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Input placeholder='Origin' />
                                    </TableCell>
                                    <TableCell>
                                        <select className='border px-3 py-2 rounded focus:outline-none w-full shadow-sm' name="" id="">
                                            <option value="">Select destination</option>
                                            {loading ? (
                                                <option>Loading...</option>
                                            ) : (
                                                airlineStations.map((station) => (
                                                    <option key={station.StationId} value={station.StationId}>
                                                        {station.StationName}
                                                    </option>
                                                ))
                                            )}
                                            {airlineStations.map((station) => (
                                                <option key={station.StationId} value={station.StationId}>
                                                    {station.StationName}
                                                </option>
                                            ))}
                                        </select>
                                    </TableCell>
                                    <TableCell>
                                        <Input type="time" />
                                    </TableCell>
                                    <TableCell>
                                        <Input type="time" />
                                    </TableCell>
                                    <TableCell>
                                        <Input placeholder="2h 30m" />
                                    </TableCell>
                                    <TableCell>
                                        <Input placeholder="Flight number" />
                                    </TableCell>
                                    <TableCell>
                                        <Input type="text" />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                const newRoutes = [...routes]
                                                newRoutes.splice(index, 1)
                                                setRoutes(newRoutes)
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default route