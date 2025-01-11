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
import { useEffect } from 'react';

export default function Airline() {
    const { airlines, loading, error, fetchAirlines } = useAirlineStore();

    useEffect(() => {
        fetchAirlines();
    }, [fetchAirlines]);

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

    const handleEdit = (record: any) => {
        console.log("Edit record:", record);
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
                    <Input placeholder="Search Airline" />
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
                    dataSource={airlines.map((airline, index) => ({
                        key: index + 1,
                        sNo: index + 1,
                        id: airline.AirlineId,
                        airline: airline.AirlineName,
                        type: airline.CmdMessage || 'N/A',
                        iata: airline.IATA,
                        icao: airline.ICAO,
                        callSign: airline.CallSign || 'N/A',
                    }))}
                    bordered
                    pagination={{ pageSize: 10 }}
                />
            </div>
        </ContentLayout>
    );
}
