"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { FormValues } from "../../types/types"
import { MetaDataTab } from "../../components/offers/MetaDataTabs"
import { PageDataTab } from "../../components/offers/PageData"
import { DatesTab } from "../../components/offers/Dates"
import { DetailsTab } from "../../components/offers/Details"
import { Services } from "../../components/offers/Services"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ContentLayout } from "@/components/admin-panel/content-layout"

interface OfferFormProps {
    initialData?: Partial<FormValues>
    onSubmit: (data: FormValues) => void
}

function page({ initialData, onSubmit }: OfferFormProps) {
    const [currentTab, setCurrentTab] = useState<string>("meta")
    const form = useForm<FormValues>({
        defaultValues: {
            title: "",
            description: "",
            url: "",
            keywords: "",
            canonicalUrl: "",
            offerTitle: "",
            offerTypeId: 0, // Fixed key
            offerTypeName: "", // Added key
            airlineId: 0, // Fixed key
            cityId: 0, // Added key
            other: "", // Added key
            offerStartDate: null,
            offerEndDate: null,
            travelStartDate: null,
            travelEndDate: null,
            discountDesc: "", // Fixed key
            cancellationPolicy: "",
            termsConditions: "", // Fixed key
            bannerUrl: "", // Added key
            thumbnailUrl: "", // Added key
            sessionId: "", // Added key
            createId: 0, // Added key
            isActive: "", // Added key
            services: [{ service: "", minBooking: 0, discount: "" }],
            ...initialData,
        },
    })


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

    const handleFormSubmit = (data: FormValues) => {
        onSubmit(data)
    }

    return (
        <ContentLayout title="Add Airline">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Home</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Airline</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add Offers</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
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
                            <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentTab === tabs[0]}>
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
        </ContentLayout >
    )
}
export default page
