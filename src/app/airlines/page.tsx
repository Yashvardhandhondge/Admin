"use client"

import { Pencil, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Table,
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

export default function Airline() {
    const airlines = [
        {
            sNo: 1,
            id: "101",
            airline: "Uzbekistan Airways",
            type: "International",
            iata: "HY",
            icao: "UZB",
            callSign: "UZBEK",
        },
        {
            sNo: 2,
            id: "102",
            airline: "SriLankan Airlines",
            type: "International",
            iata: "UL",
            icao: "ALB",
            callSign: "SRI LANKAN",
        },
        {
            sNo: 3,
            id: "103",
            airline: "SpiceJet Airlines",
            type: "Domestic",
            iata: "SG",
            icao: "SEJ",
            callSign: "SPICE JET",
        },
        {
            sNo: 4,
            id: "104",
            airline: "Air India",
            type: "International",
            iata: "AI",
            icao: "AIC",
            callSign: "AIR INDIA",
        },
        {
            sNo: 5,
            id: "105",
            airline: "IndiGo Airlines",
            type: "Domestic",
            iata: "6E",
            icao: "IGO",
            callSign: "IFLY",
        },
        {
            sNo: 6,
            id: "106",
            airline: "Vistara Airlines",
            type: "Domestic",
            iata: "UK",
            icao: "VTI",
            callSign: "VISTARA",
        },
        {
            sNo: 7,
            id: "107",
            airline: "GoAir Airlines",
            type: "Domestic",
            iata: "G8",
            icao: "GOW",
            callSign: "GOAIR",
        },
        {
            sNo: 8,
            id: "108",
            airline: "AirAsia India",
            type: "Domestic",
            iata: "I5",
            icao: "IAD",
            callSign: "RED KNIGHT",
        },
        {
            sNo: 9,
            id: "109",
            airline: "Air India Express",
            type: "International",
            iata: "IX",
            icao: "AXB",
            callSign: "EXPRESS INDIA",
        },
        {
            sNo: 10,
            id: "110",
            airline: "Alliance Air",
            type: "Domestic",
            iata: "9I",
            icao: "LLR",
            callSign: "ALLIED",
        }
    ]

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
                <Button variant="outline" className="flex gap-1 items-center bg-[#BC1110] hover:bg-[#A00D0C] text-white hover:text-white">
                    <Plus width={14} />
                    <Link href="/add-airline">Add Airline</Link>
                </Button>
            </div>
            <div className="w-full mx-auto mt-6">

                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">S.No.</TableHead>
                                <TableHead>ID</TableHead>
                                <TableHead>Airline</TableHead>
                                <TableHead>Airline Type</TableHead>
                                <TableHead>IATA</TableHead>
                                <TableHead>ICAO</TableHead>
                                <TableHead>Call Sign</TableHead>
                                <TableHead className="w-[80px]">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {airlines.map((airline) => (
                                <TableRow key={airline.id}>
                                    <TableCell>{airline.sNo}</TableCell>
                                    <TableCell>{airline.id}</TableCell>
                                    <TableCell>{airline.airline}</TableCell>
                                    <TableCell>{airline.type}</TableCell>
                                    <TableCell>{airline.iata}</TableCell>
                                    <TableCell>{airline.icao}</TableCell>
                                    <TableCell>{airline.callSign}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <Pencil className="h-4 w-4" />
                                            <span className="sr-only">Edit</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </ContentLayout>
    )
}

