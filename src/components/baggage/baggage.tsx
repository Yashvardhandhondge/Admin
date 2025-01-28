"use client"

import React, { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useAirlineStore } from "@/store/useAirlineStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BaggageProps {
    data: {
        Baggages: Array<{
            ClassTypeId: number
            FareType: string
            Luggage: string
            ChangePolicy: string
            Addons: string
        }>
    }
    updateData: (data: Partial<BaggageProps["data"]>) => void
}

export default function Baggage({ data, updateData }: BaggageProps) {
    const { airlineClassTypes, fetchAirlineClassTypes, loading, error } = useAirlineStore()

    useEffect(() => {
        fetchAirlineClassTypes()
    }, [fetchAirlineClassTypes])

    const addBaggage = () => {
        const newBaggages = [
            ...data.Baggages,
            {
                ClassTypeId: 0,
                FareType: "",
                Luggage: "",
                ChangePolicy: "",
                Addons: "",
            },
        ]
        updateData({ Baggages: newBaggages })
    }

    const removeBaggage = (index: number) => {
        const newBaggages = [...data.Baggages]
        newBaggages.splice(index, 1)
        updateData({ Baggages: newBaggages })
    }

    const updateBaggage = (index: number, field: keyof BaggageProps["data"]["Baggages"][0], value: string | number) => {
        const newBaggages = [...data.Baggages]
        newBaggages[index] = { ...newBaggages[index], [field]: value }
        updateData({ Baggages: newBaggages })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    Baggage Allowance
                    <Button type="button" variant="outline" size="sm" onClick={addBaggage}>
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
                        {data?.Baggages?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    {loading ? (
                                        <span>Loading...</span>
                                    ) : error ? (
                                        <span>{error}</span>
                                    ) : (
                                        <Select
                                            value={item?.ClassTypeId?.toString()}
                                            onValueChange={(value) => updateBaggage(index, "ClassTypeId", Number.parseInt(value))}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Class Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {airlineClassTypes.map((classType) => (
                                                    <SelectItem key={classType.ClassId} value={classType.ClassId.toString()}>
                                                        {classType.ClassName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Input
                                        placeholder="Fare type"
                                        value={item.FareType}
                                        onChange={(e) => updateBaggage(index, "FareType", e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        placeholder="Luggage allowance"
                                        value={item.Luggage}
                                        onChange={(e) => updateBaggage(index, "Luggage", e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        placeholder="Change/Cancellation rules"
                                        value={item.ChangePolicy}
                                        onChange={(e) => updateBaggage(index, "ChangePolicy", e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        placeholder="Additional services"
                                        value={item.Addons}
                                        onChange={(e) => updateBaggage(index, "Addons", e.target.value)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button type="button" variant="ghost" size="sm" onClick={() => removeBaggage(index)}>
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

