import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Input } from '../ui/input'
import { useAirlineStore } from '../../store/useAirlineStore';

function Baggage() {

    const [baggage, setBaggage] = React.useState([{ classType: '', fareType: '', luggage: '', changeCancellation: '', addon: '' }]);
    const {
        airlineClassTypes,
        loading,
        error
    } = useAirlineStore();
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        Baggage Allowance
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setBaggage([...baggage, {
                                classType: '',
                                fareType: '',
                                luggage: '',
                                changeCancellation: '',
                                addon: ''
                            }])}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Baggage Rule
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>S.No.</TableHead>
                                <TableHead>Class Type</TableHead>
                                <TableHead>Fare Type</TableHead>
                                <TableHead>Luggage</TableHead>
                                <TableHead>Change/Cancellation</TableHead>
                                <TableHead>ADD-ON</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {baggage.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        {loading ? (
                                            <span>Loading...</span>
                                        ) : error ? (
                                            <span>{error}</span>
                                        ) : (
                                            <select className='border px-3 py-2 rounded focus:outline-none w-full shadow-sm'>
                                                <option value="">Select Class Type</option>
                                                {airlineClassTypes.map((classType) => (
                                                    <option key={classType.ClassId} value={classType.ClassId}>
                                                        {classType.ClassName}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Input placeholder="Fare type" />
                                    </TableCell>
                                    <TableCell>
                                        <Input placeholder="Luggage allowance" />
                                    </TableCell>
                                    <TableCell>
                                        <Input placeholder="Change/Cancellation rules" />
                                    </TableCell>
                                    <TableCell>
                                        <Input placeholder="Additional services" />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                const newBaggage = [...baggage]
                                                newBaggage.splice(index, 1)
                                                setBaggage(newBaggage)
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

export default Baggage