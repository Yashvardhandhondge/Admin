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
    onValidationChange: (isValid: boolean) => void
}

export default function AirLineInfo({ data, updateData, onValidationChange }: AirlineInfoProps) {
    const { countries, fetchCountries, loading } = useAirlineStore()
    const [countryOptions, setCountryOptions] = useState<{ value: number; label: string }[]>([])
    const { uploadImage } = useAirlineStore()

    const [errors, setErrors] = useState<{ [key: string]: string }>({})

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

    useEffect(() => {
        const validate = () => {
            const newErrors: { [key: string]: string } = {}
            if (!data.AirlineName) newErrors.AirlineName = "Airline Name is required."
            if (!data.IataCode) newErrors.IataCode = "IATA Code is required."
            if (!data.IcaoCode) newErrors.IcaoCode = "ICAO Code is required."
            if (!data.CallSign) newErrors.CallSign = "Call Sign is required."
            if (!data.CheckInUrl) newErrors.CheckInUrl = "Check-in URL is required."
            if (!data.BaseHub) newErrors.BaseHub = "Base Hub is required."
            if (!data.Website) newErrors.Website = "Website is required."
            if (!data.FleetSize) newErrors.FleetSize = "Fleet Size is required."
            if (!data.OfficeAddress) newErrors.OfficeAddress = "Office Address is required."
            if (!data.CountryId) newErrors.CountryId = "Country is required."
            if (!data.FlightStatusUrl) newErrors.FlightStatusUrl = "Flight Status URL is required."
            if (!data.FlightTrackingUrl) newErrors.FlightTrackingUrl = "Tracking URL is required."
            if (!data.CSNo) newErrors.CSNo = "Customer Service No. is required."
            if (data.Domestic == 'N' && data.International == 'N') newErrors.Type = "Airline Type is required."
            setErrors(newErrors)
            onValidationChange(Object.keys(newErrors).length === 0)
        }

        validate()
    }, [data, onValidationChange])

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            try {
                const response = await uploadImage(file)
                if (response.CmdStatus === 1 && response.ImageName) {
                    updateData({ ImageUrl: response.ImageName })
                    console.log("Uploaded ImageName:", response.ImageName)
                } else {
                    console.error("Image upload failed:", response.CmdMessage)
                }
            } catch (error) {
                console.error("Error uploading image:", error)
            }
        }
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
                    {errors.AirlineName && <p className="text-sm text-red-500">{errors.AirlineName}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="FullName">Full Name</Label>
                    <Input id="FullName" name="FullName" value={data.FullName} onChange={handleChange} />
                    {errors.FullName && <p className="text-sm text-red-500">{errors.FullName}</p>}
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
                    {errors.Type && <p className="text-sm text-red-500">{errors.Type}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="IataCode">IATA</Label>
                    <Input id="IataCode" name="IataCode" value={data.IataCode} onChange={handleChange} />
                    {errors.IataCode && <p className="text-sm text-red-500">{errors.IataCode}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="IcaoCode">ICAO</Label>
                    <Input id="IcaoCode" name="IcaoCode" value={data.IcaoCode} onChange={handleChange} />
                    {errors.IcaoCode && <p className=" text-sm text-red-500">{errors.IcaoCode}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="CallSign">Call Sign</Label>
                    <Input id="CallSign" name="CallSign" value={data.CallSign} onChange={handleChange} />
                    {errors.CallSign && <p className="text-sm text-red-500">{errors.CallSign}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="CheckInUrl">Check-in URL</Label>
                    <Input id="CheckInUrl" name="CheckInUrl" value={data.CheckInUrl} onChange={handleChange} />
                    {errors.CheckInUrl && <p className="text-sm text-red-500">{errors.CheckInUrl}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ImageUrl">Upload Image</Label>
                    <Input id="ImageUrl" type="file" name="ImageUrl" onChange={handleImageUpload} accept="image/*" />
                    {data.ImageUrl && <p className="text-sm text-gray-600">Uploaded: {data.ImageUrl}</p>}
                    {errors.ImageUrl && <p className="text-sm text-red-500">{errors.ImageUrl}</p>}
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
                    {errors.FoundedDate && <p className="text-sm text-red-500">{errors.FoundedDate}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="BaseHub">Base Hub</Label>
                    <Input id="BaseHub" name="BaseHub" value={data.BaseHub} onChange={handleChange} />
                    {errors.BaseHub && <p className="text-sm text-red-500">{errors.BaseHub}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="FleetSize">Fleet Size</Label>
                    <Input id="FleetSize" name="FleetSize" value={data.FleetSize} onChange={handleChange} />
                    {errors.FleetSize && <p className="text-sm text-red-500">{errors.FleetSize}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="AvgFleetAge">Average Fleet Age</Label>
                    <Input id="AvgFleetAge" name="AvgFleetAge" value={data.AvgFleetAge} onChange={handleChange} />
                    {errors.AvgFleetAge && <p className="text-sm text-red-500">{errors.AvgFleetAge}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Website">Website</Label>
                    <Input id="Website" name="Website" value={data.Website} onChange={handleChange} />
                    {errors.Website && <p className="text-sm text-red-500">{errors.Website}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="FlightStatusUrl">Flight Status URL</Label>
                    <Input id="FlightStatusUrl" name="FlightStatusUrl" value={data.FlightStatusUrl} onChange={handleChange} />
                    {errors.FlightStatusUrl && <p className="text-sm text-red-500">{errors.FlightStatusUrl}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="Email">Email</Label>
                    <Input id="Email" name="Email" type="email" value={data.Email} onChange={handleChange} />
                    {errors.Email && <p className="text-sm text-red-500">{errors.Email}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="CSNo">Customer Service No.</Label>
                    <Input id="CSNo" name="CSNo" value={data.CSNo} onChange={handleChange} />
                    {errors.CSNo && <p className="text-sm text-red-500">{errors.CSNo}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="HLNo">Helpline No.</Label>
                    <Input id="HLNo" name="HLNo" value={data.HLNo} onChange={handleChange} />
                    {errors.HLNo && <p className="text-sm text-red-500">{errors.HLNo}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="FlightTrackingUrl">Tracking URL</Label>
                    <Input
                        id="FlightTrackingUrl"
                        name="FlightTrackingUrl"
                        value={data.FlightTrackingUrl}
                        onChange={handleChange}
                    />
                    {errors.FlightTrackingUrl && <p className="text-sm text-red-500">{errors.FlightTrackingUrl}</p>}
                </div>
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="OfficeAddress">Office Address</Label>
                    <Textarea id="OfficeAddress" name="OfficeAddress" value={data.OfficeAddress} onChange={handleChange} />
                    {errors.OfficeAddress && <p className="text-sm text-red-500">{errors.OfficeAddress}</p>}
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
                    {errors.CountryId && <p className="text-sm text-red-500">{errors.CountryId}</p>}
                </div>
            </CardContent>
        </Card>
    )
}

