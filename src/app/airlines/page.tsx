"use client";

import { Pencil, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Table } from "antd";
import { ContentLayout } from '@/components/admin-panel/content-layout';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Input } from '@/components/ui/input';
import { useAirlineStore } from '@/store/useAirlineStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Airline() {
    const { airlines, loading, error, fetchAirlines } = useAirlineStore();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchAirlines();
    }, [fetchAirlines]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredAirlines = airlines?.filter((airline) =>
        airline.AirlineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airline.AirlineType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airline.IataCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airline.IcaoCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airline.CallSign?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns = [
        {
            title: 'S.No.',
            dataIndex: 'sNo',
            key: 'sNo',
            width: 80,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Airline',
            dataIndex: 'airline',
            key: 'airline',
        },
        {
            title: 'Airline Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'IATA',
            dataIndex: 'iata',
            key: 'iata',
        },
        {
            title: 'ICAO',
            dataIndex: 'icao',
            key: 'icao',
        },
        {
            title: 'Call Sign',
            dataIndex: 'callSign',
            key: 'callSign',
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_: any, record: any) => (
                <button
                    className='flex items-center justify-center pl-4'
                    onClick={() => handleEdit(record)}
                >
                    <Pencil size={14} />
                </button>
            ),
        },
    ];

    const handleEdit = async (record: { id: string }) => {
        console.log("Edit record:", record);

        try {
            const sessionId = localStorage.getItem('sessionId') || 'syst';
            const url = `https://api.nixtour.com/api/CMS/AirlineEdit?sessionId=${sessionId}&airlineId=${record.id}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'accept': 'text/plain',
                },
            });

            if (response.ok) {
                const airlineData = await response.json();
                console.log("Fetched Airline Data:", airlineData);

                const {
                    CmdStatus,
                    CmdMessage,
                    URL,
                    CanonicalTag,
                    Title,
                    Description,
                    Keywords,
                    AirlineId,
                    AirlineName,
                    FullName,
                    Domestic,
                    International,
                    IataCode,
                    IcaoCode,
                    CallSign,
                    CheckInUrl,
                    ImageUrl,
                    FoundedDate,
                    BaseHub,
                    FleetSize,
                    AvgFleetAge,
                    Website,
                    FlightStatusUrl,
                    Email,
                    CSNo,
                    HLNo,
                    FlightTrackingUrl,
                    OfficeAddress,
                    CountryId,
                    CountryName,
                    MyProperty,
                    AirlineContents,
                    AirlineFleets,
                    AirlineRoutes,
                    AirlineBaggages,
                    AirlineUsefulResources,
                    AirlineFAQs,
                } = airlineData.Data;

                const structuredData = {
                    Contents: AirlineContents || [],
                    Fleets: AirlineFleets || [],
                    Routes: AirlineRoutes || [],
                    Baggages: AirlineBaggages || [],
                    Resources: AirlineUsefulResources || [],
                    Faqs: AirlineFAQs || [],
                };

                console.log("Structured Data:", structuredData);

                const airlineDataString = JSON.stringify({
                    CmdStatus,
                    CmdMessage,
                    URL,
                    CanonicalTag,
                    Title,
                    Description,
                    Keywords,
                    AirlineId,
                    AirlineName,
                    FullName,
                    Domestic,
                    International,
                    IataCode,
                    IcaoCode,
                    CallSign,
                    CheckInUrl,
                    ImageUrl,
                    FoundedDate,
                    BaseHub,
                    FleetSize,
                    AvgFleetAge,
                    Website,
                    FlightStatusUrl,
                    Email,
                    CSNo,
                    HLNo,
                    FlightTrackingUrl,
                    OfficeAddress,
                    CountryId,
                    CountryName,
                    MyProperty,
                    ...structuredData,
                });

                const query = `airlineId=${AirlineId}&SessionId=${sessionId}&airlineData=${encodeURIComponent(airlineDataString)}`;
                router.push(`/add-airline?${query}`);

            } else {
                console.error("Error fetching airline data", await response.text());
            }
        } catch (error) {
            console.error("Error during API call:", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ContentLayout title="All Airlines">
            <div className='flex items-center justify-between'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Home</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Airline</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className='flex items-center gap-3'>
                    <Input
                        placeholder="Search Airline"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Link href="/add-airline">
                        <Button variant="outline" className="flex gap-1 items-center bg-[#BC1110] hover:bg-[#A00D0C] text-white hover:text-white">
                            <Plus width={14} />
                            Add Airline
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="w-full mx-auto mt-6">
                <Table
                    columns={columns}
                    dataSource={filteredAirlines?.map((airline, index) => ({
                        key: index + 1,
                        sNo: index + 1,
                        id: airline.AirlineId,
                        airline: airline.AirlineName,
                        type: airline.AirlineType || 'N/A',
                        iata: airline.IataCode,
                        icao: airline.IcaoCode,
                        callSign: airline.CallSign || 'N/A',
                    }))}
                    bordered
                    pagination={{ pageSize: 10 }}
                />
            </div>
        </ContentLayout>
    );
}
