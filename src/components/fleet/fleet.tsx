'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from 'lucide-react'
import { useAirlineStore } from '@/store/useAirlineStore'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FleetProps {
    data: {
        Fleets: Array<{ AircraftTypeId: number; Total: number }>
    };
    updateData: (data: Partial<FleetProps['data']>) => void;
}

export default function Fleet({ data, updateData }: FleetProps) {
    const { fetchAircraftTypes, aircraftTypes, loading } = useAirlineStore();

    useEffect(() => {
        fetchAircraftTypes()
    }, [fetchAircraftTypes])

    const addFleet = () => {
        const newFleets = [...data.Fleets, { AircraftTypeId: 0, Total: 0 }];
        updateData({ Fleets: newFleets });
    };

    const removeFleet = (index: number) => {
        const newFleets = [...data.Fleets];
        newFleets.splice(index, 1);
        updateData({ Fleets: newFleets });
    };

    const updateFleet = (index: number, field: 'AircraftTypeId' | 'Total', value: number) => {
        const newFleets = [...data.Fleets];
        newFleets[index] = { ...newFleets[index], [field]: value };
        updateData({ Fleets: newFleets });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Fleet
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addFleet}
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
                        {data?.Fleets?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Select
                                        value={item?.AircraftTypeId?.toString()}
                                        onValueChange={(value) => updateFleet(index, 'AircraftTypeId', parseInt(value))}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select aircraft type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {loading ? (
                                                <SelectItem value="0">Loading...</SelectItem>
                                            ) : (
                                                aircraftTypes.map((aircraftType) => (
                                                    <SelectItem key={aircraftType?.AircraftTypeId} value={aircraftType.AircraftTypeId.toString()}>
                                                        {aircraftType?.AircraftTypeName}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.Total}
                                        onChange={(e) => updateFleet(index, 'Total', parseInt(e.target.value))}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFleet(index)}
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
