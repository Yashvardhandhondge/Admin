'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2 } from 'lucide-react'
import { useAirlineStore } from '@/store/useAirlineStore'

interface RouteProps {
    data: {
        Routes: Array<{
            Origin: string;
            Destination: string;
            DepartureTime: string;
            ArrivalTime: string;
            Duration: string;
            Flight: string;
            StartingPrice: Number;
            CheapestFlight: "Y" | "N";
            HighestSelling: "Y" | "N";
        }>
    };
    updateData: (data: Partial<RouteProps['data']>) => void;
    onValidationChange: (isValid: boolean) => void
}

export default function Route({ data, updateData, onValidationChange }: RouteProps) {
    const { fetchAirlineStations } = useAirlineStore();
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        fetchAirlineStations()
    }, [fetchAirlineStations]);

    const addRoute = () => {
        const newRoutes = [...data.Routes, {
            Origin: '',
            Destination: '',
            DepartureTime: '',
            ArrivalTime: '',
            Duration: '',
            Flight: '',
            StartingPrice: 0,
            CheapestFlight: 'N' as "Y" | "N",
            HighestSelling: 'N' as "Y" | "N"
        }];
        updateData({ Routes: newRoutes });
    };

    const removeRoute = (index: number) => {
        const newRoutes = [...data.Routes];
        newRoutes.splice(index, 1);
        updateData({ Routes: newRoutes });
    };

    const updateRoute = (index: number, field: keyof RouteProps['data']['Routes'][0], value: string | boolean) => {
        const newRoutes = [...data.Routes];
        newRoutes[index] = {
            ...newRoutes[index],
            [field]: field === 'CheapestFlight' || field === 'HighestSelling'
                ? (value ? 'Y' : 'N')
                : field === 'StartingPrice'
                    ? Number(value)
                    : value
        };
        updateData({ Routes: newRoutes });
    };

    useEffect(() => {
        const validate = () => {
            const newErrors: { [key: string]: string } = {}
            data.Routes.forEach((route, index) => {
                if (!route.Origin) newErrors[`Origin-${index}`] = "Origin is required."
                if (!route.Destination) newErrors[`Destination-${index}`] = "Destination is required."
                if (!route.DepartureTime) newErrors[`DepartureTime-${index}`] = "Departure time is required."
                if (!route.ArrivalTime) newErrors[`ArrivalTime-${index}`] = "Arrival time is required."
                if (!route.Duration) newErrors[`Duration-${index}`] = "Duration is required."
                if (!route.Flight) newErrors[`Flight-${index}`] = "Flight number is required."
                if (!route.StartingPrice) newErrors[`StartingPrice-${index}`] = "Starting price is required."
            })

            setErrors(newErrors)
            onValidationChange(Object.keys(newErrors).length === 0)
        }

        validate()
    }, [data, onValidationChange])

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Routes
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addRoute}
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
                        {data?.Routes?.map((route, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Input
                                        placeholder='Origin'
                                        value={route.Origin}
                                        onChange={(e) => updateRoute(index, 'Origin', e.target.value)}
                                    />
                                    {errors[`Origin-${index}`] && <div className="text-xs text-red-500">{errors[`Origin-${index}`]}</div>}
                                </TableCell>
                                <TableCell>
                                    <Input
                                        placeholder='Destination'
                                        value={route.Destination}
                                        onChange={(e) => updateRoute(index, 'Destination', e.target.value)}
                                    />
                                    {errors[`Destination-${index}`] && <div className="text-xs text-red-500">{errors[`Destination-${index}`]}</div>}
                                    {/* <Select
                                        value={route.Destination}
                                        onValueChange={(value) => updateRoute(index, 'Destination', value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select destination" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {loading ? (
                                                <SelectItem value="loading">Loading...</SelectItem>
                                            ) : (
                                                airlineStations.map((station) => (
                                                    <SelectItem key={station.StationId} value={station.StationId.toString()}>
                                                        {station.StationName}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select> */}
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="time"
                                        value={route.DepartureTime}
                                        onChange={(e) => updateRoute(index, 'DepartureTime', e.target.value)}
                                    />
                                    {errors[`DepartureTime-${index}`] && <div className="text-xs text-red-500">{errors[`DepartureTime-${index}`]}</div>}
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="time"
                                        value={route.ArrivalTime}
                                        onChange={(e) => updateRoute(index, 'ArrivalTime', e.target.value)}
                                    />
                                    {errors[`ArrivalTime-${index}`] && <div className="text-xs text-red-500">{errors[`ArrivalTime-${index}`]}</div>}
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type='time'
                                        placeholder="2h 30m"
                                        value={route.Duration}
                                        onChange={(e) => updateRoute(index, 'Duration', e.target.value)}
                                    />
                                    {errors[`Duration-${index}`] && <div className="text-xs text-red-500">{errors[`Duration-${index}`]}</div>}
                                </TableCell>
                                <TableCell>
                                    <Input
                                        placeholder="Flight number"
                                        value={route.Flight}
                                        onChange={(e) => updateRoute(index, 'Flight', e.target.value)}
                                    />
                                    {errors[`Flight-${index}`] && <div className="text-xs text-red-500">{errors[`Flight-${index}`]}</div>}
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={route.StartingPrice.toString()}
                                        onChange={(e) => updateRoute(index, 'StartingPrice', e.target.value)}
                                    />
                                    {errors[`StartingPrice-${index}`] && <div className="text-xs text-red-500">{errors[`StartingPrice-${index}`]}</div>}
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={route.CheapestFlight === 'Y'}
                                        onCheckedChange={(checked) => updateRoute(index, 'CheapestFlight', checked as boolean)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        checked={route.HighestSelling === 'Y'}
                                        onCheckedChange={(checked) => updateRoute(index, 'HighestSelling', checked as boolean)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeRoute(index)}
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
    )
}
