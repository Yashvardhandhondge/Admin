import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Input } from '../ui/input'
import { Plus, Trash2 } from 'lucide-react'
import { useAirlineStore } from '../../store/useAirlineStore';

function Fleet() {
    const [fleet, setFleet] = React.useState([{ aircraftType: '', total: '' }]);
    const {
        aircraftTypes,
        loading
    } = useAirlineStore();

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Fleet
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setFleet([...fleet, { aircraftType: '', total: '' }])}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Aircraft
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>S.No.</TableHead>
                                <TableHead>Aircraft Type</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {fleet.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <select className='border px-3 py-2 rounded focus:outline-none w-full shadow-sm' name="" id="">
                                            <option value="">Select aircraft type</option>
                                            {loading ? (
                                                <option>Loading...</option>
                                            ) : (
                                                aircraftTypes.map((aircraftType) => (
                                                    <option key={aircraftType.AircraftTypeId} value={aircraftType.AircraftTypeId}>
                                                        {aircraftType.AircraftTypeName}
                                                    </option>
                                                ))
                                            )}
                                            {aircraftTypes.map((aircraftType) => (
                                                <option key={aircraftType.AircraftTypeId} value={aircraftType.AircraftTypeId}>
                                                    {aircraftType.AircraftTypeName}
                                                </option>
                                            ))}
                                        </select>
                                    </TableCell>
                                    <TableCell>
                                        <Input type="number" />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                const newFleet = [...fleet]
                                                newFleet.splice(index, 1)
                                                setFleet(newFleet)
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

export default Fleet