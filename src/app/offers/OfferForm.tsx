"use client"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Tabs,TabsList,TabsTrigger } from "@/components/ui/tabs"
import type { FormValues } from "@/types/types"
import { MetaDataTab } from "@/components/offers/MetaDataTabs"
import { PageDataTab } from "@/components/offers/PageData"
import { DatesTab } from "@/components/offers/Dates"
import { DetailsTab } from "@/components/offers/Details"
import { Services } from "@/components/offers/Services"

export function OfferForm() {
    const searchParams = useSearchParams();
    const [currentTab, setCurrentTab] = useState<string>("meta")
    const form = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
            url: "",
            keywords: "",
            canonicalUrl: "",
            canonicalTag: "",
            offerTitle: "",
            offerTypeId: 0,
            offerTypeName: "",
            airlineId: 0,
            cityId: 0,
            other: "",
            offerStartDate: null,
            offerEndDate: null,
            travelStartDate: null,
            travelEndDate: null,
            discountDesc: "",
            cancellationPolicy: "",
            termsConditions: "",
            bannerUrl: "",
            thumbnailUrl: "",
            sessionId: "",
            createId: 0,
            isActive: "",
            services: [{ service: "", minBooking: 0, discount: "" }],
        },
    })

    useEffect(() => {
        const offerData = searchParams.get('offerData');
        if (offerData) {
            try {
                // Decode the base64 string back to JSON
                const decodedData = atob(offerData);
                const parsedData = JSON.parse(decodedData);
                
                console.log('Parsed offer data:', parsedData);
                
                const formData = {
                    title: parsedData.OfferTitle,
                    description: parsedData.Description,
                    url: parsedData.Url,
                    canonicalTag: parsedData.CanonicalTag,
                    keywords: parsedData.Keywords,
                    offerTitle: parsedData.OfferTitle,
                    offerTypeId: parsedData.OfferTypeId,
                    offerType: parsedData.OfferTypeName,
                    offerTypeName: parsedData.OfferTypeName,
                    airlineId: parsedData.AirlineId,
                    cityId: parsedData.CityId,
                    other: parsedData.Other,
                    offerStartDate: parsedData.OfferStartDate ? new Date(parsedData.OfferStartDate) : null,
                    offerEndDate: parsedData.OfferEndDate ? new Date(parsedData.OfferEndDate) : null,
                    travelStartDate: parsedData.TravelStartDate ? new Date(parsedData.TravelStartDate) : null,
                    travelEndDate: parsedData.TravelEndDate ? new Date(parsedData.TravelEndDate) : null,
                    discountDescription: parsedData.DiscountDesc,
                    cancellationPolicy: parsedData.CancellationPolicy,
                    termsConditions: parsedData.TermsConditions,
                    bannerUrl: parsedData.BannerUrl,
                    thumbnailUrl: parsedData.ThumbnailUrl,
                    services: parsedData.OfferDetails?.map((detail: any) => ({
                        service: detail.Services,
                        minBooking: detail.MinBookingAmt,
                        discount: detail.Offers
                    })) || []
                };

                form.reset(formData);
                
            } catch (error) {
                console.error('Error parsing offer data:', error);
            }
        }
    }, [searchParams, form]);

    const tabs = ["meta", "page", "dates", "details", "services"]

    const handleNext = () => {
        const currentIndex = tabs.indexOf(currentTab)
        if (currentIndex < tabs.length - 1) {
            setCurrentTab(tabs[currentIndex + 1])
        }
    }

    const handlePrevious = () => {
        const currentIndex = tabs.indexOf(currentTab)
        if (currentIndex > 0) {
            setCurrentTab(tabs[currentIndex - 1])
        }
    }

    const uploadImage = async (file: File) => {
        const formData = new FormData()
        formData.append('image', file)

        const response = await fetch('https://api.nixtour.com/api/Image/upload', {
            method: 'POST',
            body: formData,
        })

        const result = await response.json()
        console.log('Image upload response:', result)

        if (result.Success) {
            return result.Data.ImagePath
        }
        throw new Error(result.Error || 'Upload failed')
    }

    const handleFormSubmit = async (data: FormValues) => {
        try {
            if (data.banner instanceof File) {
                const bannerPath = await uploadImage(data.banner)
                data.bannerUrl = bannerPath
            }

            if (data.thumbnail instanceof File) {
                const thumbnailPath = await uploadImage(data.thumbnail)
                data.thumbnailUrl = thumbnailPath
            }

            const apiPayload = {
                Url: data.url,
                CanonicalTag: data.canonicalTag,
                Title: data.title,
                Description: data.description,
                Keywords: data.canonicalTag,
                OfferTitle: data.title,
                OfferTypeId: 1,
                OfferTypeName: data.offerType,
                AirlineId: data.airlineId,
                CityId: data.cityId,
                Other: data.other,
                OfferStartDate: data.offerStartDate?.toISOString(),
                OfferEndDate: data.offerEndDate?.toISOString(),
                TravelStartDate: data.travelStartDate?.toISOString(),
                TravelEndDate: data.travelEndDate?.toISOString(),
                DiscountDesc: data.discountDesc,
                CancellationPolicy: data.cancellationPolicy,
                TermsConditions: data.termsConditions,
                BannerUrl: data.bannerUrl,
                ThumbnailUrl: data.thumbnailUrl,
                SessionId: localStorage.getItem('sessionId') || "syst",
                CreateId: 101,
                IsActive: data.isActive,
                OfferDetails: data.services.map(service => ({
                    Services: service.service,
                    MinBookingAmt: service.minBooking,
                    Offers: service.discount
                }))
            }

            const response = await fetch('https://api.nixtour.com/api/CMSOffer/OfferSave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiPayload)
            })

            const result = await response.json()
            console.log('Offer save response:', result)

            if (!result.Success) {
                throw new Error(result.Error || 'Failed to save offer')
            }
            
        } catch (error) {
            console.error('Error processing form:', error)
        }
    }

    return (
        <Form {...form}>
            <form className="mt-6" onSubmit={form.handleSubmit(handleFormSubmit)}>
                <Tabs value={currentTab} onValueChange={setCurrentTab}>
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="meta">Meta Data</TabsTrigger>
                        <TabsTrigger value="page">Page Data</TabsTrigger>
                        <TabsTrigger value="dates">Dates</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                    </TabsList>

                    <MetaDataTab control={form.control} />
                    <PageDataTab control={form.control} />
                    <DatesTab control={form.control} />
                    <DetailsTab control={form.control} />
                    <Services
                        control={form.control}
                        getValues={form.getValues}
                        setValue={form.setValue}
                        watch={form.watch}
                        register={form.register}
                    />
                    <div className="flex justify-between mt-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handlePrevious} 
                            disabled={currentTab === tabs[0]}
                        >
                            Previous
                        </Button>
                        {currentTab === tabs[tabs.length - 1] ? (
                            <Button type="submit">Save</Button>
                        ) : (
                            <Button type="button" onClick={handleNext}>
                                Next
                            </Button>
                        )}
                    </div>
                </Tabs>
            </form>
        </Form>
    )
}