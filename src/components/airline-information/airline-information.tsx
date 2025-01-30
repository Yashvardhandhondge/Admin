"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useAirlineStore } from "@/store/useAirlineStore"


interface AirlineInfoProps {
    data: {
        AirlineName: string
        FullName: string
        Domestic: string
        International: string
        IataCode: string
        IcaoCode: string
        CallSign: string
        CheckInUrl: string
        ImageUrl: string
        FoundedDate: string
        BaseHub: string
        FleetSize: string
        AvgFleetAge: string
        Website: string
        FlightStatusUrl: string
        Email: string
        CSNo: string
        HLNo: string
        FlightTrackingUrl: string
        OfficeAddress: string
        CountryId: number
    }
    updateData: (data: Partial<AirlineInfoProps["data"]>) => void
}

export default function AirLineInfo({ data, updateData }: AirlineInfoProps) {
    const { countries, fetchCountries, loading } = useAirlineStore()
    const [countryOptions, setCountryOptions] = useState<{ value: number; label: string }[]>([])

    useEffect(() => {
        fetchCountries()
    }, [fetchCountries])

    useEffect(() => {
        if (countries?.length) {
            const options = countries.map((country) => ({
                value: Number(country.CountryId),
                label: country.CountryName,
            }))
            setCountryOptions(options)
        }
    }, [countries])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateData({ [e.target.name]: e.target.value })
    }

    const handleCheckboxChange = (field: "Domestic" | "International") => {
        const updatedValue = data[field] === "Y" ? "N" : "Y"
        updateData({ [field]: updatedValue })
    }

    const handleDateChange = (date: string) => {
        updateData({ FoundedDate: date })
    }
    const handleCountryChange = (value: number) => {
        updateData({ CountryId: value })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Airline Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="AirlineName">Airline Name</Label>
                    <Input id="AirlineName" name="AirlineName" value={data.AirlineName} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="FullName">Full Name</Label>
                    <Input id="FullName" name="FullName" value={data.FullName} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label className="font-medium text-gray-700">Airline Type</Label>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="Domestic"
                                checked={data.Domestic === "Y"}
                                onCheckedChange={() => handleCheckboxChange("Domestic")}
                            />
                            <Label htmlFor="Domestic">Domestic</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="International"
                                checked={data.International === "Y"}
                                onCheckedChange={() => handleCheckboxChange("International")}
                            />
                            <Label htmlFor="International">International</Label>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="IataCode">IATA</Label>
                    <Input id="IataCode" name="IataCode" value={data.IataCode} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="IcaoCode">ICAO</Label>
                    <Input id="IcaoCode" name="IcaoCode" value={data.IcaoCode} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="CallSign">Call Sign</Label>
                    <Input id="CallSign" name="CallSign" value={data.CallSign} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="CheckInUrl">Check-in URL</Label>
                    <Input id="CheckInUrl" name="CheckInUrl" value={data.CheckInUrl} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ImageUrl">Image URL</Label>
                    <Input id="ImageUrl" name="ImageUrl" value={data.ImageUrl} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="FoundedDate">Founded Date</Label>
                    <Input
                        id="FoundedDate"
                        name="FoundedDate"
                        type="date"
                        value={
                            (data.FoundedDate &&
                                new Date(new Date(data.FoundedDate).getTime() - new Date().getTimezoneOffset() * 60000)
                                    .toISOString()
                                    .split("T")[0]) ||
                            ""
                        }
                        onChange={(e) => handleDateChange(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="BaseHub">Base Hub</Label>
                    <Input id="BaseHub" name="BaseHub" value={data.BaseHub} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="FleetSize">Fleet Size</Label>
                    <Input id="FleetSize" name="FleetSize" value={data.FleetSize} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="AvgFleetAge">Average Fleet Age</Label>
                    <Input id="AvgFleetAge" name="AvgFleetAge" value={data.AvgFleetAge} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Website">Website</Label>
                    <Input id="Website" name="Website" value={data.Website} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="FlightStatusUrl">Flight Status URL</Label>
                    <Input id="FlightStatusUrl" name="FlightStatusUrl" value={data.FlightStatusUrl} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Email">Email</Label>
                    <Input id="Email" name="Email" type="email" value={data.Email} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="CSNo">Customer Service No.</Label>
                    <Input id="CSNo" name="CSNo" value={data.CSNo} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="HLNo">Helpline No.</Label>
                    <Input id="HLNo" name="HLNo" value={data.HLNo} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="FlightTrackingUrl">Tracking URL</Label>
                    <Input
                        id="FlightTrackingUrl"
                        name="FlightTrackingUrl"
                        value={data.FlightTrackingUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="OfficeAddress">Office Address</Label>
                    <Textarea id="OfficeAddress" name="OfficeAddress" value={data.OfficeAddress} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="CountryId">Country</Label>
                    <select
                        id="CountryId"
                        name="CountryId"
                        value={data.CountryId}
                        onChange={(e) => handleCountryChange(Number(e.target.value))}
                        className="w-full p-2 border rounded-md"
                    >
                        <option value="">Select a country</option>
                        {countryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </CardContent>
        </Card>
    )
}

