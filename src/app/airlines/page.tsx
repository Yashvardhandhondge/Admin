"use client"

import { Pencil, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table } from "antd"
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ContentLayout } from '@/components/admin-panel/content-layout'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { Input } from '@/components/ui/input'

export default function Airline() {
    const airlines = [
        {
            key: 1,
            sNo: 1,
            id: "101",
            airline: "Uzbekistan Airways",
            type: "International",
            iata: "HY",
            icao: "UZB",
            callSign: "UZBEK",
        },
        {
            key: 2,
            sNo: 2,
            id: "102",
            airline: "SriLankan Airlines",
            type: "International",
            iata: "UL",
            icao: "ALB",
            callSign: "SRI LANKAN",
        },
        {
            key: 3,
            sNo: 3,
            id: "103",
            airline: "SpiceJet Airlines",
            type: "Domestic",
            iata: "SG",
            icao: "SEJ",
            callSign: "SPICE JET",
        },
        {
            key: 4,
            sNo: 4,
            id: "104",
            airline: "Emirates Airlines",
            type: "International",
            iata: "EK",
            icao: "UAE",
            callSign: "EMIRATES",
        },
        {
            key: 5,
            sNo: 5,
            id: "105",
            airline: "Qatar Airways",
            type: "International",
            iata: "QR",
            icao: "QTR",
            callSign: "QATARI",
        },
        {
            key: 6,
            sNo: 6,
            id: "106",
            airline: "American Airlines",
            type: "International",
            iata: "AA",
            icao: "AAL",
            callSign: "AMERICAN",
        },
        {
            key: 7,
            sNo: 7,
            id: "107",
            airline: "Delta Air Lines",
            type: "International",
            iata: "DL",
            icao: "DAL",
            callSign: "DELTA",
        },
        {
            key: 8,
            sNo: 8,
            id: "108",
            airline: "British Airways",
            type: "International",
            iata: "BA",
            icao: "BAW",
            callSign: "SPEEDBIRD",
        },
        {
            key: 9,
            sNo: 9,
            id: "109",
            airline: "Air India",
            type: "Domestic",
            iata: "AI",
            icao: "AIC",
            callSign: "AIR INDIA",
        },
        {
            key: 10,
            sNo: 10,
            id: "110",
            airline: "IndiGo Airlines",
            type: "Domestic",
            iata: "6E",
            icao: "IGO",
            callSign: "IFLY",
        },
        {
            key: 11,
            sNo: 11,
            id: "111",
            airline: "Singapore Airlines",
            type: "International",
            iata: "SQ",
            icao: "SIA",
            callSign: "SINGAPORE",
        },
        {
            key: 12,
            sNo: 12,
            id: "112",
            airline: "Lufthansa",
            type: "International",
            iata: "LH",
            icao: "DLH",
            callSign: "LUFTHANSA",
        }

    ];

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
                    dataSource={airlines}
                    bordered
                    pagination={{ pageSize: 10 }}
                />
            </div>

        </ContentLayout>
    )
}

