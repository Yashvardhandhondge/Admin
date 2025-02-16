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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Offer {
    OfferId: number;
    OfferTypeName: string;
    OfferTitle: string;
    OfferStartDate: string;
    OfferEndDate: string;
    IsActive: string;
}

export default function OffersPage() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await fetch(`https://api.nixtour.com/api/CMSOffer/OfferSearch?sessionid=${0}&createid=${101}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = await response.json();
            if (result.Success) {
                setOffers(result.Data);
            } else {
                setError(result.Error || 'Failed to fetch offers');
            }
        } catch (error) {
            setError('Error fetching offers');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredOffers = offers?.filter((offer) =>
        offer.OfferTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.OfferTypeName.toLowerCase().includes(searchQuery.toLowerCase())
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
            title: 'Offer Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Offer Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
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

    const handleEdit = async (record: { id: number }) => {
        try {
            const response = await fetch(`https://api.nixtour.com/api/CMSOffer/OfferEdit?offerId=${record.id}&sessionId=${0}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const result = await response.json();
                
                if (result.Success) {
                    const offerData = result.Data.OfferModel;
                    
                    // Use btoa to encode the JSON string to base64
                    const base64Data = btoa(JSON.stringify(offerData));
                    const query = `offerData=${base64Data}`;
                    
                    router.push(`/offers?${query}`);
                } else {
                    console.error('Failed to fetch offer details:', result.Error);
                }
            }
        } catch (error) {
            console.error('Error fetching offer details:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ContentLayout title="All Offers">
            <div className='flex items-center justify-between'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Home</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Offers</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className='flex items-center gap-3'>
                    <Input
                        placeholder="Search Offer"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Link href="/offers">
                        <Button variant="outline" className="flex gap-1 items-center bg-[#BC1110] hover:bg-[#A00D0C] text-white hover:text-white">
                            <Plus width={14} />
                            Add Offer
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="w-full mx-auto mt-6">
                <Table
                    columns={columns}
                    dataSource={filteredOffers?.map((offer, index) => ({
                        key: index + 1,
                        sNo: index + 1,
                        id: offer.OfferId,
                        title: offer.OfferTitle,
                        type: offer.OfferTypeName,
                        startDate: new Date(offer.OfferStartDate).toLocaleDateString(),
                        endDate: new Date(offer.OfferEndDate).toLocaleDateString(),
                        status: offer.IsActive,
                    }))}
                    bordered
                    pagination={{ pageSize: 10 }}
                />
            </div>
        </ContentLayout>
    );
}