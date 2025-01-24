"use client";

import React, { useEffect, useState } from 'react'
import { TabsContent } from '../ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import { DatePicker } from 'antd'
import { useAirlineStore } from '../../store/useAirlineStore';

function AirLineInfo() {

    const {
        countries,
        fetchCountries,
        loading
    } = useAirlineStore();

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);



    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Airline Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label>Airline Name</label>
                        <Input />
                    </div>
                    <div className="space-y-2">
                        <label>Full Name</label>
                        <Input />
                    </div>
                    <div className="space-y-2">
                        <label className="font-medium text-gray-700">Airline Type</label>
                        <div className="flex items-center space-x-4">

                            <div className="flex items-center space-x-2">
                                <Checkbox />
                                <label htmlFor="domestic" className="text-gray-600">
                                    Domestic
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox />
                                <label htmlFor="international" className="text-gray-600">
                                    International
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label>IATA</label>
                        <Input />
                    </div>
                    <div className="space-y-2">
                        <label>ICAO</label>
                        <Input />
                    </div>
                    <div className="space-y-2">
                        <label>Call Sign</label>
                        <Input />
                    </div>
                    <div className="space-y-2">
                        <label>Check-in URL</label>
                        <Input />
                    </div>
                    <div className="space-y-2">
                        <label>Image</label>
                        <Input className='pt-[6px]' type='file' />
                    </div>
                    <div className="space-y-2">
                        <label>Founded Date</label>
                        <DatePicker
                            className="w-full py-[6px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label>Base Hub</label>
                        <Input />
                    </div>
                    <div className="space-y-2">
                        <label>Fleet Size</label>
                        <Input />
                    </div>
                    <div className="space-y-2">
                        <label>Average Fleet Age</label>
                        <Input />
                    </div>
                    <div className="space-y-2">
                        <label>Website</label>
                        <Input />
                    </div>
                    <div className="space-y-2">
                        <label>Flight Status URL</label>
                        <Input />
                    </div>
                    <div className="space-y-2">
                        <label>Email</label>
                        <Input type="email" />
                    </div>
                    <div className="space-y-2">
                        <label>Customer Service No.</label>
                        <Input />
                    </div>
                    <div className="space-y-2">
                        <label>Helpline No.</label>
                        <Input />
                    </div>
                    <div className="space-y-2">
                        <label>Tracking URL</label>
                        <Input />
                    </div>

                    <div className="space-y-2 col-span-2">
                        <label>Office Address</label>
                        <Textarea />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="country">Country</label>
                        <select className='border px-3 py-2 rounded focus:outline-none' name="" id="">
                            <option value="">Select a country</option>
                            {loading ? (
                                <option>Loading...</option>
                            ) : (
                                countries.map((country) => (
                                    <option key={country.CountryId} value={country.CountryId}>
                                        {country.CountryName}
                                    </option>
                                ))
                            )}
                            {countries.map((country) => (
                                <option key={country.CountryId} value={country.CountryId}>
                                    {country.CountryName}
                                </option>
                            ))}
                        </select>
                    </div>

                </CardContent>
            </Card>

        </div>
    )
}

export default AirLineInfo